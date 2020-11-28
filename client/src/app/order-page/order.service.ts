import { Injectable } from '@angular/core';
import { OrderPosition, Position } from '../shared/interfaces';

@Injectable()

export class OrderService {

    public list: OrderPosition[] = []
    public price = 0

    add(position: Position) {
        const orderPosition:OrderPosition = Object.assign({}, {
            name: position.name,
            cost: position.cost,
            quantity: position.quantity,
            _id: position._id
        })

        const candidate = this.list.find(p => {
            p._id === orderPosition._id
        })
        if (candidate) {
            //изменяем кол-во
            candidate.quantity += orderPosition.quantity
        }
        else {
            this.list.push(orderPosition)
        }

        this.computePrise()

    }

    private computePrise() {
        this.price = this.list.reduce((total, item) => {
            return total += item.quantity * item.cost
        }, 0)
    }

    remove(orderPosition: OrderPosition) {
        const ind = this.list.findIndex(p => {
            p._id === orderPosition._id
        })
        this.list.splice(ind, 1)
        this.computePrise()
    }

    clear() {
        this.list = []
        this.price = 0
    }

}