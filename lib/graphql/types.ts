import { GetCategoryQuery, GetHomeScreensQuery, GetVideoCommentsQuery } from './generated/graphql';

// Video type extracted from GetCategoryQuery
export type Video = NonNullable<
  NonNullable<GetCategoryQuery['category']['videos']>[number]
>;

// Comment type extracted from GetVideoCommentsQuery
export type Comment = NonNullable<
  NonNullable<NonNullable<GetVideoCommentsQuery['videoComments']['edges']>[number]>['node']
>;

// HomeScreen type extracted from GetHomeScreensQuery
export type HomeScreen = GetHomeScreensQuery['homeScreens'][number];
