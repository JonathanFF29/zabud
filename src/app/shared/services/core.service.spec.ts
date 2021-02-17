import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { Photos } from '../model/photo.model';
import { dummyItems } from '../testingData/dummy.data';

import { CoreService } from './core.service';

describe('CoreService', () => {
  let service: CoreService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CoreService]
    });
    service = TestBed.inject(CoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('be able to retrieve items from the API https://jsonplaceholder.typicode.com/photos by GET', async(() => {
    service.getList().subscribe(items => {
      expect(items[0]).toEqual(dummyItems[0]);
    });
  }));

  it('be able to save item in the API https://jsonplaceholder.typicode.com/photos by POST', async(() => {
    const item = {
      albumId: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952"
    }
    service.saveItem(item).subscribe(item => {
      console.log('items', item)
      expect(item).toEqual(item);
    });
  }));

});
