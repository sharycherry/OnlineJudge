import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {
  problem : Problem;

  constructor(
    private route : ActivatedRoute,
    @Inject("data") private data
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.data.getProblem(+params["id"])
        .then(problem => {
          if (problem) {
            this.problem = problem;
          } else {
            console.log("error!");
          }
        }).catch(this.handleError);
    });
  }
  // error hanlder
  private handleError(error : any) : Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.body || error);
  }
}
