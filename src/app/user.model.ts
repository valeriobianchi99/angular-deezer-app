import { FormControl, Validators } from '@angular/forms';

/*** User class ***/
export class User {
    firstname: string;
    lastname: string;
    email: FormControl;
    username: string;
    password: string;
    data = {
        'songs': []
    }

    constructor(){
        this.firstname = '';
        this.lastname = '';
        this.email = new FormControl('', Validators.email);
        this.username = '';
        this.password = '';
        this.data.songs = new Array();
    }
}
/*** End of User class ***/