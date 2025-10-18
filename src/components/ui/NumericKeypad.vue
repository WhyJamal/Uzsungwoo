<script setup>
import { computed, toRefs } from "vue";

const emit = defineEmits(["update:modelValue", "save", "delete"]);

const props = defineProps({
  modelValue: { type: String, default: "" },
  maxLength: { type: Number, default: 30 },
  disableSaveWhenEmpty: { type: Boolean, default: true },
});

const { modelValue, maxLength, disableSaveWhenEmpty } = toRefs(props);

const disableSave = computed(
  () =>
    disableSaveWhenEmpty.value &&
    (!modelValue.value || String(modelValue.value).length === 0)
);

function onKey(key) {
  if (key === "saqlash") {
    emit("save", modelValue.value);
    return;
  }
  const newVal = String(modelValue.value ?? "") + String(key);
  if (newVal.length > maxLength.value) return;
  emit("update:modelValue", newVal);
}

function onDeleteClick() {
  const cur = String(modelValue.value ?? "");
  const newVal = cur.slice(0, -1);
  emit("update:modelValue", newVal);
  emit("delete", newVal);
}
</script>

<template>
  <div class="nk-root" role="application" aria-label="Raqamli klaviatura">
    <!-- Display -->
    <div class="nk-display" aria-hidden="true">{{ modelValue }}</div>

    <div class="nk-grid">
      <template v-for="row in 3">
        <button
          v-for="col in 3"
          :key="'num-' + row + '-' + col"
          class="nk-btn"
          @click="onKey((row - 1) * 3 + col)"
          type="button"
          aria-label="'raqam ' + ((row-1)*3+col)"
        >
          <span class="nk-btn-inner">{{ (row - 1) * 3 + col }}</span>
        </button>
      </template>

      <button
        class="nk-btn nk-btn-save nk-btn-save-vertical"
        @click="onKey('saqlash')"
        :disabled="disableSave"
        type="button"
        aria-label="saqlash"
      >
        <span class="nk-btn-inner">saqlash</span>
      </button>
    </div>

    <div class="nk-last-row">
      <button
        class="nk-btn nk-btn-delete"
        @click="onDeleteClick"
        type="button"
        aria-label="ochirish"
      >
        <span class="nk-btn-inner">ochirish</span>
      </button>
      <button
        class="nk-btn nk-btn-zero"
        @click="onKey(0)"
        type="button"
        aria-label="0"
      >
        <span class="nk-btn-inner">0</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.nk-root {
  --nk-gap: 12px;
  --nk-radius: 16px;
  --nk-bg: #f7f8fb;
  --btn-bg: #fff;
  --btn-press-bg: #e0e4ff;
  --btn-save-bg: #2563eb;
  --btn-save-text: #fff;
  --btn-text: #0f172a;

  max-width: 520px;
  margin: 0 auto;
  padding: 18px;
  background: var(--nk-bg);
  border-radius: 20px;
  box-shadow: 0 8px 28px rgba(16, 24, 40, 0.06);
  user-select: none;
}

.nk-display {
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 16px;
  font-weight: 600;
  font-size: 20px;
  color: #0f172a;
  margin-bottom: 14px;
  background: transparent;
  border-radius: 12px;
}

.nk-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr) 110px;
  gap: var(--nk-gap);
}

.nk-btn {
  aspect-ratio: 1 / 1;
  border: none;
  cursor: pointer;
  border-radius: var(--nk-radius);
  background: var(--btn-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 800;
  color: var(--btn-text);
  transition: transform 0.09s ease, background 0.09s ease, box-shadow 0.09s ease;
  box-shadow: 0 3px 8px rgba(16, 24, 40, 0.04);
  padding: 8px;
}

.nk-btn:active {
  transform: translateY(1px) scale(0.995);
  background: var(--btn-press-bg);
}

.nk-btn-save-vertical {
  width: 120px;
  height: 350px;
  grid-row: 1 / span 3;
  background: var(--btn-save-bg);
  color: var(--btn-save-text);
  font-weight: 900;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  font-size: 18px;
  box-shadow: 0 8px 22px rgba(37, 99, 235, 0.18);
}

.nk-btn-save-vertical .nk-btn-inner {
  display: inline-block;
  transform: rotate(-90deg);
  transform-origin: center;
  white-space: nowrap;
  letter-spacing: 0.6px;
}

.nk-btn-save-vertical:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
}

.nk-last-row {
  display: flex;
  gap: var(--nk-gap);
  margin-top: var(--nk-gap);
}

.nk-btn-zero,
.nk-btn-delete {
  flex: 1;
  aspect-ratio: 3 / 1;
  border-radius: var(--nk-radius);
  font-size: 20px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(16, 24, 40, 0.04);
  padding: 8px 12px;
}

.nk-btn-delete {
  background: #fee2e2;
  color: #991b1b;
}

@media (max-width: 420px) {
  .nk-root {
    padding: 12px;
    max-width: 360px;
  }
  .nk-grid {
    grid-template-columns: repeat(3, 1fr) 88px;
    gap: 10px;
  }
  .nk-btn {
    font-size: 18px;
  }
  .nk-display {
    height: 56px;
    font-size: 16px;
  }
  .nk-btn-save-vertical {
    font-size: 16px;
  }
  .nk-btn-save-vertical .nk-btn-inner {
    transform: rotate(-90deg) scale(0.95);
  }
}
</style>
