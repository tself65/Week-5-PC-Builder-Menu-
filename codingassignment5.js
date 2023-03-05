class Component {
    constructor(name) {
        this.name = name;
    }

    describe() {
        return `${this.name}`; 
    }
}

class PC {
    constructor(name) {
        this.name = name; 
        this.components = []; 
    }

    createComponent(component) {
        if (component instanceof Component) {
            this.components.push(component); 
        } else {
            throw new Error(`You can only add an instance of Component. Argument is not a component: ${component}`); 
        }
    }

    describe () {
        return `${this.name} has ${this.components.length} components.`; 
    }
}

class Menu {
    constructor() {
        this.PCs = [];
        this.selectedPC = null; 
    }

    start() {
        let selection = this.showMainMenuOptions(); 
        while (selection != 0) {
            switch (selection) {
                case '1': 
                    this.createPC(); 
                    break; 
                case '2': 
                    this.displayBuilds(); 
                    break; 
                case '3': 
                    this.deletePC(); 
                    break;
                case '4': 
                    this.viewCart(); 
                    break;
                default: 
                    selection = 0;         
            }
            selection = this.showMainMenuOptions();
        }

        alert('Thank you for shopping with us today!'); 
    } 

    showMainMenuOptions() {
        return prompt(`
        Welcome to PC Builder.Com 
        0: Leave
        1: Create New PC Build
        2: View All Builds
        3: Delete PC Build
        4: View Cart
        `);
    } 

    showCartOptions(PCInfo) {
        return prompt(`
        0: Back
        1: Add Component 
        2: Delete Component
        ----------Cart----------
        ${PCInfo}
        `);
    }

    createPC() {
        let name = prompt('Enter a name for your new PC build:'); 
        this.PCs.push(new PC(name)); 
    }


    displayBuilds() {
        let itemString = ''; 
        for (let i = 0; i < this.PCs.length; i++) {
            itemString += i + ': ' + this.PCs[i].name + '\n'; 
        } 
        alert('Saved Builds:' + '\n' + itemString); 
    }


    deletePC() {
        let index = prompt('Enter the index of the PC you wish to delete'); 
        if (index > -1 && index < this.PCs.length) {
            this.PCs.splice(index, 1); 
        }
    }


    viewCart() {
        let index = prompt('Enter the index of the PC you wish to purchase:'); 
        if (index > -1 && index < this.PCs.length) {
            this.selectedPC = this.PCs[index]; 
            let description = 'PC Build: ' + this.selectedPC.name + '\n'; 
        
            for (let c = 0; c < this.selectedPC.components.length; c++) {
                description += c + ': ' + this.selectedPC.components[c].name + '\n'; 
            }

            let selection = this.showCartOptions(description);
            switch (selection) {
                case '1': 
                  this.addComponent();
                  break; 
                case '2': 
                  this.deleteComponent(); 
            }
        }

    }

    addComponent() {
        let name = prompt('Enter name for new component:'); 
        this.selectedPC.components.push(new Component(name)); 
    }

    deleteComponent() {
        let index = prompt('Enter the index of the component you wish to delete:'); 
        if (index > -1 && index < this.selectedPC.components.length) {
            this.selectedPC.components.splice(index, 1); 
        }
    }

} 

let menu = new Menu(); 
menu.start(); 