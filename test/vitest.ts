import {vi} from "vitest";

// prevents udev triggers from `Adapter.create` doing discovery (massive slowdown on some systems)
vi.mock("serialport-rs", async (importOriginal) => {
    const original = await importOriginal<typeof import("serialport-rs")>();
    original.SerialPort.binding = {
        list: vi.fn().mockResolvedValue([]),
        open: vi.fn().mockRejectedValue(new Error("Serial binding must be mocked")),
    };
    original.SerialPort.list = original.SerialPort.binding.list;
    return original;
});
