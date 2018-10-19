import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {CoursesService} from "./courses.service";
import {AppState} from "../../reducers";
import {select, Store} from "@ngrx/store";
import {filter, first, tap} from "rxjs/operators";
import { selectCourseById } from "../course.selectors";
import { CourseRequested } from "../course.actions";

@Injectable()
export class CourseResolver implements Resolve<Course> {
    constructor(
        private coursesService:CoursesService,
        private store: Store<AppState>) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
      const courseId = route.params['id'];
      // old way
      //return this.coursesService.findCourseById(courseId);

      // new way
      return this.store
        .pipe(
          //look for course in store
          select(selectCourseById(courseId)),
          //if course is not in the store
          //let the store know that a course requested event occur
          tap(course => {
            if(!course) {
              this.store.dispatch(new CourseRequested({courseId}));
            }
          }),
          //filter out the case for when the course is not in the store
          filter(course => !!course),
          first()
        )
    }
}

