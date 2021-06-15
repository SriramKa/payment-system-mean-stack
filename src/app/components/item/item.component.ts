import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from '../../interfaces/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() item!: Item;
  rzrpay!: any;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {}

  buyItem() {
    this.itemService.placeOrder(this.item).subscribe((response) => {
      this.rzrpay = new this.itemService.nativeWindow.Razorpay(response);
      this.rzrpay.open();
    });
  }
}
