import {Scanner} from "./qr-scanner/qr-scanner";

new Scanner(document.querySelector('video')).readCode().then(result => alert(result));
