import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchTerm: string = '';


  constructor(private activivatedRoute: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    this.activivatedRoute.params.subscribe((params) => {
      if(params['searchTerm']) this.searchTerm = params['searchTerm']
    })
  }


  public search(term : string) : void {
    console.log(term);

    if(term){
      this.router.navigateByUrl('/search/'+term)
    }
  }

}
