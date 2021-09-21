import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Post } from '../models/Post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-sortable-list',
  templateUrl: './sortable-list.component.html',
  styleUrls: ['./sortable-list.component.scss']
})
export class SortableListComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => (this.posts=posts));
  }

  updatePosts(){
    this.postService.updatePosts(this.posts).subscribe((posts) => (this.posts = posts));
  }

  sortAlphabetically(){
    this.posts = this.posts.sort((p1, p2) => p1.title.localeCompare(p2.title))
    this.updatePosts();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.posts, event.previousIndex, event.currentIndex);
  }

}
