import { Component } from '@angular/core';
import { UserInfo } from '../../../app/models/user-details.model';
import { ConfigConstants, ListConstants, SortConstants } from '../../components/constants';
import { SearchTaskRequest } from '../../models/dtos';
import { TaskFieldConfig } from '../../models/tasks';
import { TaskListWrapperComponent } from '../task-list-wrapper/task-list-wrapper.component';

@Component({
  selector: 'exui-my-tasks',
  templateUrl: 'my-tasks.component.html'
})
export class MyTasksComponent extends TaskListWrapperComponent {

  public get emptyMessage(): string {
    return ListConstants.EmptyMessage.MyTasks;
  }

  public get sortSessionKey(): string {
    return SortConstants.Session.MyTasks;
  }

  public get view(): string {
    return ListConstants.View.MyTasks;
  }

  public get fields(): TaskFieldConfig[] {
    return ConfigConstants.MyWorkTasks;
  }

  public getSearchTaskRequestPagination(): SearchTaskRequest {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      const id = userInfo.id ? userInfo.id : userInfo.uid;
      const isJudge = userInfo.roles.some(role => ListConstants.JUDGE_ROLES.includes(role));
      return {
        search_parameters: [
          { key: 'user', operator: 'IN', values: [ id ] },
        ],
        sorting_parameters: [this.getSortParameter()],
        search_by: isJudge ? 'judge' : 'caseworker',
        pagination_parameters: this.getPaginationParameter()
      };
    }
  }

  /**
   * Handle the paging event
   */
   public onPaginationEvent(pageNumber: number): void {
    this.onPaginationHandler(pageNumber);
  }
}
