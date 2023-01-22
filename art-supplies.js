/*•	Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements:
•	Use at least one array.
•	Use at least two classes.
•	Your menu should have the options to create, view, and delete elements.*/

class Supply {
    constructor(supply, amount, color) {
        this.supply = supply;
        this.amount = amount;
        this.color = color;
    }

    describe() {
        return `${this.amount} ${this.color} ${this.supply}.`;
    }
}

class Artbox {
    constructor (name) {
        this.name = name;
        this.supplies = [];

    }

    addSupply (supply) {
        if (supply instanceof Supply) {
            this.supplies.push(supply);
        } else {
            throw new Error(`You can only add an instance of Supply. Argument is not a supply: ${supply}`);
        }
    }

    describe () {
        return `${this.name} art box has ${this.supplies.length} supplies.`;
    }
}

class Menu {
    constructor () {
        this.artboxes = [];
        this.selectedArtbox = null;
    }

    start () {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.addArtbox();
                    break;
                case '2':
                    this.deleteArtbox();
                    break;
                case '3':
                    this.viewArtbox();
                    break;
                case '4':
                    this.displayArtboxes();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert ('Goodbye');
    }

    showMainMenuOptions() {
        return prompt (`
        [0] Exit
        [1] Add an Artbox
        [2] Delete an Artbox
        [3] View an Artbox
        [4] Display all Artboxes
        `);
    }

    showArtBoxMenuOptions(artboxInfo) {
        return prompt (`
        [0] Back
        [1] Add a Supply
        [2] Delete a Supply
        ------------------------
        ${artboxInfo}
        `);
    }

    addArtbox() {
        let name = prompt("Enter name for new art box:");
        this.artboxes.push(new Artbox(name));
    }

    deleteArtbox() {
        let index = prompt ("Enter the index of the art box you wish to delete:");
        if (index > -1 && index < this.artboxes.length) {
            this.artboxes.splice(index, 1);
        }
    }

    viewArtbox() {
        let index = prompt("Enter the index of the art box you wish to view:");
        if (index > -1 && index < this.artboxes.length) {
            this.selectedArtbox = this.artboxes[index];
            let description = 'Art Box Name: ' + this.selectedArtbox.name + "\n";

            for (let i =0; i < this.selectedArtbox.supplies.length; i++) {
                description += "[" + i + "] " + this.selectedArtbox.supplies[i].amount + ' '
                    + this.selectedArtbox.supplies[i].color + ' '
                    + this.selectedArtbox.supplies[i].supply + "\n";
            }

            let selection = this.showArtBoxMenuOptions(description);
            switch (selection) {
                case '1':
                    this.addSupply();
                    break;
                case '2':
                    this.deleteSupply();
            }
        }
    }

    displayArtboxes() {
        let artboxString = "";
        for (let i = 0; i < this.artboxes.length; i++) {
            artboxString += "[" + i + "] " + this.artboxes[i].name + "\n";
        }
        alert(artboxString);
    }


    addSupply() {
        let amount = prompt ("Add the amount of the supply:");
        let color = prompt ("Add the color of the supply:");
        let supply = prompt ("Add the type of supply:"); 
        this.selectedArtbox.supplies.push(new Supply(supply, amount, color));
    }

    deleteSupply() {
        let index = prompt ("Enter the index of the supply you wish to delete:");
        if (index > -1 && index < this.selectedArtbox.supplies.length) {
            this.selectedArtbox.supplies.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();
