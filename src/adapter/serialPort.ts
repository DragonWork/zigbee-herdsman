/* v8 ignore start */

import {platform} from "node:os";
import {
    type AutoDetectTypes,
    type BindingInterface,
    type ErrorCallback,
    SerialPort as NativeSerialPort,
    type SerialPortOpenOptions,
    type SetOptions,
} from "serialport-rs";

export type {SerialPortOpenOptions};

export class SerialPort<T extends BindingInterface = AutoDetectTypes> extends NativeSerialPort<T> {
    constructor(options: SerialPortOpenOptions<T>, openCallback?: ErrorCallback) {
        // Avoid resetting Windows coordinators through DTR during open.
        super(platform() === "win32" ? {...options, hupcl: false} : options, openCallback);
    }

    public async asyncOpen(): Promise<void> {
        return await new Promise((resolve, reject): void => {
            this.open((err) => (err ? reject(err) : resolve()));
        });
    }

    public async asyncClose(): Promise<void> {
        return await new Promise((resolve, reject): void => {
            this.close((err) => (err ? reject(err) : resolve()));
        });
    }

    public async asyncFlush(): Promise<void> {
        return await new Promise((resolve, reject): void => {
            this.flush((err) => (err ? reject(err) : resolve()));
        });
    }

    public async asyncFlushAndClose(): Promise<void> {
        await this.asyncFlush();
        await this.asyncClose();
    }

    public async asyncGet(): Promise<{cts: boolean; dsr: boolean; dcd: boolean}> {
        return await new Promise((resolve, reject): void => {
            // biome-ignore lint/style/noNonNullAssertion: ignored using `--suppress`
            this.get((err, options?) => (err ? reject(err) : resolve(options!)));
        });
    }

    public async asyncSet(options: SetOptions): Promise<void> {
        return await new Promise((resolve, reject): void => {
            this.set(options, (err) => (err ? reject(err) : resolve()));
        });
    }
}
