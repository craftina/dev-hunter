import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { Developer } from 'src/app/main/interfaces/developer.interface';
import { DeveloperService } from 'src/app/main/services/developer.service';

@Component({
  selector: 'app-developer-profile',
  templateUrl: './developer-profile.component.html',
  styleUrls: ['./developer-profile.component.css']
})
export class DeveloperProfileComponent implements OnInit {

  developer!: Developer;
  developerId!: number;
  loading: boolean = true;

  developerImageUrl: string = '../../../assets/images/dev-image.png';

  constructor(
    private developerService: DeveloperService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.developerId = +id;
    }
  }

  ngOnInit(): void {
    this.developerService.getDeveloperById$(this.developerId)
      .pipe(
        take(1),
        finalize(() => this.loading = false)
      ).subscribe({
        next: ((resp: Developer) => {
          this.developer = resp;
        })
      })
  }

  onClickEdit(): void {
    this.router.navigate(['developers', this.developerId, 'edit'])
  }

  onClickDelete(): void {
    this.developerService.deleteDeveloper$(this.developerId).pipe(take(1)).subscribe({
      next: (() => {
        this.router.navigate(['developers']);
      })
    })
  }
}
