"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var hbs_1 = __importDefault(require("hbs"));
var path_1 = __importDefault(require("path"));
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    App.prototype.config = function () {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use('./static', express_1.default.static('public'));
        this.app.use('/', express_1.default.static('node_modules/bootstrap/dist'));
        hbs_1.default.registerPartials(path_1.default.join(__dirname, '../../views/partials'));
        this.app.set('view engine', 'hbs');
        this.app.set('views', path_1.default.join(__dirname, '../../views'));
    };
    App.prototype.routes = function () {
        var router = express_1.default.Router(); //novi ruter objek.
        router.get('/', function (req, res) {
            res.send('<h1>Hello world</h1>');
        });
        router.get('/about', function (req, res) {
            res.render('about', {
                pageTitle: 'This is about page!',
                pageAutor: 'Zoran M.',
                pagePeople: [
                    { name: 'Marko', surname: 'Markovic' },
                    { name: 'Darko', surname: 'Perovic' }
                ]
            });
        });
        this.app.use('/', router);
    };
    return App;
}());
exports.default = new App().app;
