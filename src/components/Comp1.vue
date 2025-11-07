<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'
import { type EvalFunction, parse } from 'mathjs'
import Konva from 'konva'
import { useFormulaStore } from '@/stores/formula-store.ts'

const props = defineProps<{ msg: string }>()

const formulaStore = useFormulaStore()

let stage: Konva.Stage
let layer = new Konva.Layer()

const maxX = [-100, 100]
const maxY = [-100, 100]
const rangeX = ref([-10, 10])
const rangeY = ref([-10, 10])

// const formula = ref('f(x,y) = -x^2 + y^2')
const formula = ref(formulaStore.formula)
const isValid = ref(true)
let compiled: EvalFunction

const parseFormula = () => {
  if (!formula.value) return

  const parsed = parse(formula.value)
  compiled = parsed.compile()
}

const angle = ref(0)

const step = ref(120)
const animIntId = ref(-1)
const animate = () => {
  clearInterval(animIntId.value)
  animIntId.value = setInterval(() => {
    angle.value += 0.1
  }, step.value)
}
watch(step, animate)
animate()

const getColorFromX = (x: number, x0: number, x1: number) => {
  // Normalizare X la 0-1
  const normalized = (x - x0) / (x1 - x0)
  const hue = Math.floor(normalized * 360)
  return `hsl(${hue}, 70%, 50%)`
}

const drawFormula = () => {
  if (!compiled) parseFormula()
  if (!stage || !stage.container()) {
    return
  }
  layer.destroyChildren()

  const [x0, x1] = [rangeX.value[0] ?? -10, rangeX.value[1] ?? 10]
  const [y0, y1] = [rangeY.value[0] ?? -10, rangeY.value[1] ?? 10]

  const cosT = Math.cos(angle.value)
  const sinT = Math.sin(angle.value)

  for (let xx = x0; xx <= x1; xx += 3) {
    const linePoints = []

    for (let yy = y0; yy <= y1; yy += 3) {
      const zz = compiled.evaluate()(xx, yy)
      const xRot = xx * cosT - yy * sinT
      const yRot = xx * sinT + yy * cosT
      const x2d = xRot
      const y2d = yRot - zz * 0.1

      linePoints.push(x2d, y2d)
    }

    const polygon = new Konva.Line({
      points: linePoints,

      stroke: getColorFromX(xx, x0, x1),
      strokeWidth: 1,
      closed: false,
      x: stage.width() / 2,
      y: stage.height() * 0.6,
    })
    layer.add(polygon)
  }
}

watchEffect(() => {
  if (rangeX.value) drawFormula()
  if (rangeY.value) drawFormula()
})

watch(formula, (newValue) => {
  try {
    formulaStore.setFormula(newValue)
    parseFormula()
    drawFormula()
  } catch (e) {
    isValid.value = false
    return
  }
  isValid.value = true
})

const initStage = () => {
  const w = document.querySelector('#drawing-panel')?.parentElement?.clientWidth
  const h = document.querySelector('#drawing-panel')?.parentElement?.clientHeight
  stage = new Konva.Stage({
    container: 'drawing-panel', // id of container <div>
    width: w ?? 500,
    height: h ?? 500,
  })
  stage.add(layer)
}
const resizeStage = () => {
  const w = document.querySelector('#drawing-panel')?.parentElement?.clientWidth
  const h = document.querySelector('#drawing-panel')?.parentElement?.clientHeight
  stage.width(w ?? 500)
  stage.height(h ?? 500)
}

onMounted(() => {
  rangeX.value = [-40, 40]
  rangeY.value = [-40, 40]

  initStage()
  window.addEventListener('resize', resizeStage)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeStage)
})
</script>

<template>
  <v-alert :type="isValid ? 'success' : 'error'" variant="tonal" class="mb-4">
    <textarea v-model="formula" rows="4" cols="50" />
  </v-alert>

  <v-card>
    <v-card-title>graph</v-card-title>
    <v-card-item>
      <v-label>x</v-label>
      <v-range-slider
        v-model="rangeX"
        :max="maxX[1]"
        :min="maxX[0]"
        :step="1"
        class="align-center"
        hide-details
      >
        <template v-slot:prepend>
          <v-text-field
            v-model="rangeX[0]"
            density="compact"
            style="width: 70px"
            type="number"
            variant="outlined"
            hide-details
            single-line
          ></v-text-field>
        </template>
        <template v-slot:append>
          <v-text-field
            v-model="rangeX[1]"
            density="compact"
            style="width: 70px"
            type="number"
            variant="outlined"
            hide-details
            single-line
          ></v-text-field>
        </template>
      </v-range-slider>
    </v-card-item>
    <v-card-item>
      <v-label>y</v-label>
      <v-range-slider
        v-model="rangeY"
        :max="maxY[1]"
        :min="maxY[0]"
        :step="1"
        class="align-center"
        hide-details
      >
        <template v-slot:prepend>
          <v-text-field
            v-model="rangeY[0]"
            density="compact"
            style="width: 70px"
            type="number"
            variant="outlined"
            hide-details
            single-line
          ></v-text-field>
        </template>
        <template v-slot:append>
          <v-text-field
            v-model="rangeY[1]"
            density="compact"
            style="width: 70px"
            type="number"
            variant="outlined"
            hide-details
            single-line
          ></v-text-field>
        </template>
      </v-range-slider>
    </v-card-item>

    <v-card-item>
      <div id="drawing-panel" class="drawing-panel"></div>
    </v-card-item>
    <v-card-item>
      <v-label>speed</v-label>
      {{ 300 / step }}
      <v-slider v-model="step" :max="300" :min="30" :step="30" thumb-label reverse></v-slider>
    </v-card-item>
  </v-card>
</template>

<style scoped>
.drawing-panel {
  --aspect-ratio: 0.2;
  min-height: 50vh;

  background-color: #0a3069;
}
</style>
