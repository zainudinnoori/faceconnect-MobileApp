import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularWebStorageModule } from 'angular-web-storage';
import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/providers';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';
import { LoginProvider } from '../providers/login/login';
import { SignupProvider } from '../providers/signup/signup';
import { UserPostsProvider } from '../providers/user-posts/user-posts';
import { LoggedinUserPostsProvider } from '../providers/loggedin-user-posts/loggedin-user-posts';
import { FollowingUsersPostProvider } from '../providers/following-users-post/following-users-post';
import { PostLikesCommentsProvider } from '../providers/post-likes-comments/post-likes-comments';
import { GetUserInfoProvider } from '../providers/get-user-info/get-user-info';
import { GetFollowersProvider } from '../providers/get-followers/get-followers';
import { GetFollowingsProvider } from '../providers/get-followings/get-followings';
import { GetUserOwnPostsProvider } from '../providers/get-user-own-posts/get-user-own-posts';
import { GetUserPhotosProvider } from '../providers/get-user-photos/get-user-photos';
import { GetSinglePostProvider } from '../providers/get-single-post/get-single-post';
import { StorePostProvider } from '../providers/store-post/store-post';
import { StoreLikeProvider } from '../providers/store-like/store-like';
import { StoreCommentProvider } from '../providers/store-comment/store-comment';
import { PostCrudProvider } from '../providers/post-crud/post-crud';
import { SharePostProvider } from '../providers/share-post/share-post';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FollowUserProvider } from '../providers/follow-user/follow-user';
import { UpdatePostProvider } from '../providers/update-post/update-post';
// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularWebStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginProvider,
    SignupProvider,
    UserPostsProvider,
    LoggedinUserPostsProvider,
    FollowingUsersPostProvider,
    PostLikesCommentsProvider,
    GetUserInfoProvider,
    GetFollowersProvider,
    GetFollowingsProvider,
    GetUserOwnPostsProvider,
    GetUserPhotosProvider,
    GetSinglePostProvider,
    StorePostProvider,
    StoreLikeProvider,
    StoreCommentProvider,
    PostCrudProvider,
    SharePostProvider,
    FollowUserProvider,
    UpdatePostProvider,
  ]
})
export class AppModule { }
