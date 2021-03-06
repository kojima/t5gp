enum NeoPixelColorsPlus {
    //% block=赤
    Red = 0xFF0000,
    //% block=オレンジ
    Orange = 0xFFA500,
    //% block=黄
    Yellow = 0xFFFF00,
    //% block=緑
    Green = 0x00FF00,
    //% block=黄緑
    YellowGreen = 0x9ACD32,
    //% block=青
    Blue = 0x0000FF,
    //% block=水色
    WaterBlue = 0x73B6FE,
    //% block=藍
    Indigo = 0x043C78,
    //% block=すみれ
    Violet = 0xEE82EE,
    //% block=紫
    Purple = 0xFF00FF,
    //% block=ピンク
    Pink = 0xFF69B4,
    //% block=消
    None = null
}

enum LEDs {
    //% block="LED 1"
    LED1,
    //% block="LED 2"
    LED2,
    //% block="LED 1,2"
    BOTH_LEDS
}

enum Offsets {
    //% block="1"
    ONE = 1,
    //% block="2"
    TWO = 2,
}

enum RotateDirection {
    //% block="前"
    FORWRD = 1,
    //% block="後"
    BACKWARD = -1,
}

let t5gpStrip1: neopixel.Strip = neopixel.create(DigitalPin.P0, 3, NeoPixelMode.RGB)
let t5gpStrip2: neopixel.Strip = neopixel.create(DigitalPin.P1, 3, NeoPixelMode.RGB)

/**
 * 津田小5年ブロック
 */
//% weight=70 color=#e67e22 icon="\uf005" block="津田小5年ブロック"
namespace tsuda_5th_grade_performance {

    /**
     * LEDを指定した色で点灯します
    */
    //% block="%led|を%color=neopixel_colors_plus|で点灯"
    //% weight=100
    export function litLED(led: LEDs, color: number): void {
        if (color === NeoPixelColorsPlus.None) {
            turnOffLED(led)
        } else {
            if (led === LEDs.LED1 || led === LEDs.BOTH_LEDS) {
                t5gpStrip1.showColor(color)
            }
            if (led === LEDs.LED2 || led === LEDs.BOTH_LEDS) {
                t5gpStrip2.showColor(color)
            }
        }
    }

    function _setPixelColor(led: LEDs, offset: number, color: number): void {
        if (color === null) {
            if (led === LEDs.LED1 || led === LEDs.BOTH_LEDS) {
                t5gpStrip1.buf.fill(0, offset * 3, 3)
            }
            if (led === LEDs.LED2 || led === LEDs.BOTH_LEDS) {
                t5gpStrip2.buf.fill(0, offset * 3, 3)
            }
        } else {
            if (led === LEDs.LED1 || led === LEDs.BOTH_LEDS) {
                t5gpStrip1.setPixelColor(offset, color)
            }
            if (led === LEDs.LED2 || led === LEDs.BOTH_LEDS) {
                t5gpStrip2.setPixelColor(offset, color)
            }
        }
    }

    /**
     * LEDを別々の色で点灯します
    */
    //% block="%led|を%color1=neopixel_colors_plus|%color2=neopixel_colors_plus|%color3=neopixel_colors_plus|で点灯"
    //% weight=90
    export function litLEDWithColors(led: LEDs, color1: number, color2: number, color3: number): void {
        _setPixelColor(led, 0, color1)
        _setPixelColor(led, 1, color2)
        _setPixelColor(led, 2, color3)
        if (led === LEDs.LED1 || led === LEDs.BOTH_LEDS) {
            t5gpStrip1.show()
        }
        if (led === LEDs.LED2 || led === LEDs.BOTH_LEDS) {
            t5gpStrip2.show()
        }
    }

    /**
     * LEDを消灯します
    */
    //% block="%led|を消灯"
    //% weight=80
    export function turnOffLED(led: LEDs): void {
        if (led === LEDs.LED1 || led === LEDs.BOTH_LEDS) {
            t5gpStrip1.clear()
            t5gpStrip1.show()
        }
        if (led === LEDs.LED2 || led === LEDs.BOTH_LEDS) {
            t5gpStrip2.clear()
            t5gpStrip2.show()
        }
    }

    /**
     * LEDの光っている位置をずらします
    */
    //% block="%led|を%direcastion|へ%offset|個ずらす"
    //% weight=70
    export function rotate(led: LEDs, direction: RotateDirection, offset: Offsets): void {
        const d = direction === RotateDirection.FORWRD ? 1 : -1
        const o = offset === Offsets.ONE ? 1 : 2
        if (led === LEDs.LED1 || led === LEDs.BOTH_LEDS) {
            t5gpStrip1.rotate(d * o)
            t5gpStrip1.show()
        }
        if (led === LEDs.LED2 || led === LEDs.BOTH_LEDS) {
            t5gpStrip2.rotate(d * o)
            t5gpStrip2.show()
        }
    }

    /**
     * LEDの色を選択します
    */
    //% weight=10
    //% blockId="neopixel_colors_plus" block="%color"
    //% advanced=true
    export function colors(color: NeoPixelColorsPlus): number {
        return color
    }

    /**
     * カラーコード(#FF00FFのようなコード)を色に変換します
    */
    //% weight=5
    //% block="カラーコード%colorCode|を色に変換"
    //% advanced=true
    export function convertColorCode(colorCode: string): number {
        if (colorCode[0] === '#') {
            colorCode = colorCode.slice(1)
        }
        return parseInt(colorCode, 16)
    }
}