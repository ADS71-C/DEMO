import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MongoService {

  constructor(private http: HttpClient) {
  }

  getHighestScoredMessages(): Observable<any> {
    return this.http.get('https://api.rickrongen.nl/snob/smug_top_scored', {
      headers: {
        'Authorization': 'Basic ZHNfc25vYmJ5X3Nub2I6cXVlZW5lbGl6YWJldGg='
      }
    })
      .map((it: any) => it._items);
  }
}
