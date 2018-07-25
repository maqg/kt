import {EventEmitter} from "events";
import {ErrorObj} from "./api/api-tools";

export class GlobalErrorEvent {

    public static EVENT_TAG: string = "GLOBAL_ERROR_EVENT";
    private static emitter: EventEmitter = new EventEmitter();
    public static emitError(error: ErrorObj) {
        error.time = (new Date()).getTime();
        GlobalErrorEvent.emitter.emit(GlobalErrorEvent.EVENT_TAG, error);
    }
    public static handelError(handler: (err?: ErrorObj)=>void) {
        GlobalErrorEvent.emitter.addListener(GlobalErrorEvent.EVENT_TAG, handler);
    }
    public static removeHandel(handler: (err?: ErrorObj)=>void) {
        GlobalErrorEvent.emitter.removeListener(GlobalErrorEvent.EVENT_TAG, handler);
    };
}
