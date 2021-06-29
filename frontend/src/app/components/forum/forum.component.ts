import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  messageClass;
  message;
  newPost = false;
  form;
  commentForm;
  processing = false;
  username;
  email;
  myforum;
  newComment = [];
  comment;
  enabledComments = [];



  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private postService: PostService
    ) {
      this.createNewPostForm();
      this.createCommentForm();
     }


    createNewPostForm() {
      this.form = this.formBuilder.group({
        body: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(500),
          Validators.minLength(5)
        ])]

      })
    }

    createCommentForm() {
      this.commentForm = this.formBuilder.group({
        comment: ['', Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200)
        ])]
      })
    }

    onForumSubmit() {
      console.log('submitted')
       this.processing = true;
       const post = {
        body: this.form.get('body').value,
        createdBy: this.username
      }
      this.postService.addPost(post).subscribe((data : any) => {
        if (!data.success) {
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
          this.processing = false;
        } else {
          this.messageClass = 'alert alert-success';
          this.message = data.message;
          this.getAllPosts();

          setTimeout(() => {
            this.newPost = false;
            this.processing = false;
            this.message = false;
            this.form.reset();
            }, 2000);
        }
      })
    }

  newFormPost() {
    this.newPost = true;
  }

  draftComment(id) {
    this.commentForm.reset();
    this.newComment = [];
    this.newComment.unshift(id);

  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe((data : any) => {
      this.myforum = data.posts;
    });
  }



   postComment(id) {
    this.processing = true; // Lock buttons while saving comment to database
    const comment = this.commentForm.get('comment').value;

    this.postService.postComment(id, comment).subscribe(data => {
      this.getAllPosts();
      const index = this.newComment.indexOf(id);
      this.newComment.splice(index, 1);
      this.commentForm.reset();
      this.processing = false;
      if (this.enabledComments.indexOf(id) < 0) this.expand(id);
    });
  }


    expand(id) {
     this.enabledComments.push(id);
    }

   collapse(id) {
    const index = this.enabledComments.indexOf(id);
    this.enabledComments.splice(index, 1);
    }


  ngOnInit(): void {
     this.authService.getProfile().subscribe((res: any) => {
       this.username = res.user.username;});

      this.getAllPosts();
}

}
