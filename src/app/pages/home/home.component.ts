import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteItemComponent } from 'src/app/shared/components/delete-item/delete-item.component';
import { Photos } from 'src/app/shared/model/photo.model';
import { CoreService } from 'src/app/shared/services/core.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listaPhotos: any = [];
  dataSource: MatTableDataSource<Photos>;
  displayedColumns = ['albumId', 'id', 'title', 'url', 'thumbnailUrl', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private coreService: CoreService, public dialog: MatDialog, private router : Router ) { }

  ngOnInit(): void {
    this.coreService.getList().subscribe((r) => {
      this.listaPhotos = r;
      this.dataSource = new MatTableDataSource( this.listaPhotos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
    });
  }

  deleteItem(element) {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '250px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.event === 'delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  deleteRowData(rowobj){
    this.coreService.deleteItem(rowobj.id).subscribe((r) => {
      this.simulateDeleteItem(rowobj.id);
    }, error => {
    });
  }

  simulateDeleteItem(id){
    this.listaPhotos = this.listaPhotos.filter((value, key) => {
      return value.id !== id;
    });
    this.dataSource = new MatTableDataSource( this.listaPhotos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addItem() {
    this.router.navigateByUrl('/detail');
  }



}
