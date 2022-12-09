const head = {
    x: 0,
    y: 0,
    move (dir, amount) {
        switch(dir) {
            case 'U':
                this.moveY(amount);
                break;
            case 'D':
                this.moveY(0 - amount);
                break;
            case 'R':
                this.moveX(amount);
                break;
            case 'L':
                this.moveX(0 - amount);
                break;
        }
    },
    moveY (amount) {
        for (let i= 0; i < Math.abs(amount); i++) {
            this.y = amount > 0 ? this.y + 1 : this.y - 1;
            tail.updatePosition();
        }
    },
    moveX (amount) {
        for (let i= 0; i < Math.abs(amount); i++) {
            this.x = amount > 0 ? this.x + 1 : this.x - 1;
            tail.updatePosition();
        }
    }
}

const tail = {
    x: 0,
    y: 0,
    positions: new Set(['0,0']),
    updatePosition() {
        if (head.x == this.x && head.y == this.y) {
            this.logPosition([this.x, this.y]);
            return;
        }
        else if (Math.abs(Math.abs(head.x) - Math.abs(this.x)) > 1) {
            this.x = head.x > this.x ? this.x + 1 : this.x - 1;
            if (this.y !== head.y) {
                this.y = head.y > this.y ? this.y + 1 : this.y - 1;
            }
            console.log(`Move 2 ${head.x}, ${head.y}, ${this.x}, ${this.y}`);
        }
        else if (Math.abs(Math.abs(head.y) - Math.abs(this.y)) > 1) {
            this.y = head.y > this.y ? this.y + 1 : this.y - 1;
            if (this.x !== head.x) {
                this.x = head.x > this.x ? this.x + 1 : this.x - 1;
            }
            console.log(`Move 2 ${head.x}, ${head.y}, ${this.x}, ${this.y}`);
        }
        else {
            console.log(`Move 1 ${head.x}, ${head.y}, ${this.x}, ${this.y}`);
        }
        this.logPosition([this.x, this.y]);
    },
    logPosition(position) {
        this.positions.add(position.toString());
    }
}

const input = document.querySelector('pre').textContent.trim().split('\n');
input.forEach(line => {
    const [direction, amount] = line.split(' ');
    const amt = parseInt(amount);
    head.move(direction, amt);
});

console.log(tail.positions.size);
