<template>
    <div>
        <div class="canvas" ref="canvas"></div>
        <div v-for="insect in insects">
            <p>
                insect health: {{ insect.health }} translation: {{ insect.translation.x }},{{
                    insect.translation.y
                }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Two from 'two.js';
import { SquareInsect } from '@/models/SquareInsect';

function rollup(v: number, max: number): number {
    while (v > max) {
        v -= max;
    }
    while (v < 0) {
        v += max;
    }
    return v;
}
@Component
export default class HelloWorld extends Vue {
    insects: SquareInsect[] = [];
    two: Two = new Two({
        fullscreen: false,
        autostart: true,
    });
    mounted() {
        this.two.appendTo(this.$refs.canvas as HTMLElement);
        this.start();
    }
    start() {
        this.insects.push(
            new SquareInsect(
                this.two,
                this.insects,
                Math.random() * this.two.width,
                Math.random() * this.two.height
            )
        );

        this.two.bind('update', () => {
            this.insects.forEach(insect => {
                insect.move();
                insect.translation.x = rollup(insect.translation.x, this.two.width);
                insect.translation.y = rollup(insect.translation.y, this.two.height);
            });
        });
    }
}
</script>

<style scoped>
.canvas {
    border: 2px dashed gray;
}
</style>
