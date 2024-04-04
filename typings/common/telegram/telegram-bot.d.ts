import { Telegram } from './types';
export declare enum TelegramParseModeEnum {
    HTML = "HTML"
}
declare class TelegramBot {
    #private;
    constructor(token: string);
    private send;
    sendMessage(msg: string, chat_id?: number): Promise<unknown>;
    sendError(err: Error | unknown): Promise<void>;
    sendMedia({ media, msg, chat_id, parse_mode, }: Telegram.SendMediaDto): Promise<Telegram.Response>;
    sendDocument(path: string, opts?: {
        chatId: string;
        caption: string;
    }): Promise<void>;
}
export declare const telegramBot: TelegramBot;
export {};
