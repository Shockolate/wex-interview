import { Injectable } from '@nestjs/common';
import { PageViewDto } from './dtos/page-view.dto';

type CustomerData = {
  daysActive: Set<number>;
  pagesVisited: Set<number>;
};

type CustomerWithId = {
  CustomerId: number;
};

@Injectable()
export class PageViewService {
  private customers: Map<number, CustomerData>;
  constructor() {
    this.customers = new Map();
  }

  bulkInsert(pageViews: PageViewDto[]) {
    for (const pageView of pageViews) {
      if (this.customers.has(pageView.CustomerId)) {
        const customer = this.customers.get(pageView.CustomerId);
        customer!.daysActive.add(new Date(pageView.Date).getDate());
        customer!.pagesVisited.add(pageView.PageId);
      } else {
        this.customers.set(pageView.CustomerId, {
          daysActive: new Set([new Date(pageView.Date).getDate()]),
          pagesVisited: new Set([pageView.PageId]),
        });
      }
    }
  }

  getLoyalCustomers(/* date start, date end */): CustomerWithId[] {
    const loyalCustomers: CustomerWithId[] = [];
    for (const [key, value] of this.customers.entries()) {
      if (PageViewService.isLoyal(value)) {
        loyalCustomers.push({ CustomerId: key });
      }
    }
    return loyalCustomers;
  }

  private static isLoyal(customer: CustomerData): boolean {
    return customer.daysActive.size >= 2 && customer.pagesVisited.size >= 2;
  }
}

// Frontend App
//   - Users can visit multiple pages within this Frontend App, pages have id
//   - Users can have an account
//   - User visits a page,
//   - application needs to emit page view event
//   - application takes event

//
