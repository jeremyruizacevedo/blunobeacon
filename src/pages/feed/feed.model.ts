export class FeedPostModel {
	title: string;
	image: string;
	description: string;
}

export class FeedModel {
  category: any;
  posts: Array<FeedPostModel>;
}
