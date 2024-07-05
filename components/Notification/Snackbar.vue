<template>
  <div
    class="snackbar"
    :class="{ 'snackbar--m': !screen.isDesktop() }"
  >
    <transition-group
      name="list-complete"
      tag="div"
    >
      <div
        v-for="item in items"
        :key="item.timestamp"
        class="pl-3 pr-5 py-2 mb-2 list-complete-item w-full snackbar__item relative"
      >
        <div
          v-if="item.status === statuses.SUCCESS"
          class="c-flash_icon c-flash_icon--success animate font-normal mr-3"
        >
          <span class="line tip" /><span class="line long" />
          <div class="placeholder" />
          <div class="fix" />
        </div>
        <div
          v-else-if="item.status === statuses.ERROR"
          class="c-flash_icon c-flash_icon--error animate font-normal mr-3"
        >
          <span class="x-mark">
            <span class="line left" />
            <span class="line right" />
          </span>
        </div>
        <div
          v-else-if="item.status === statuses.WARNING"
          class="c-flash_icon c-flash_icon--warning animate font-normal mr-3"
        >
          <div class="letter">
            !
          </div>
        </div>
        <div
          v-else-if="item.status === statuses.INFO"
          class="c-flash_icon c-flash_icon--info animate font-normal mr-3"
        >
          <div class="letter">
            i
          </div>
        </div>
        <div
          class="my-auto"
          v-html="item.message"
        />
        <div
          type="button"
          class="pa-2 text-size--2"
          style="position: absolute; top: 0; right: 0;"
          @click="deleteNote(item.timestamp)"
        >
          x
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script setup lang="ts">
import { SnackbarStatus} from "~/app/Modules/Snakbar/Contracts";
import { useUtils} from "~/stores/utils";
import { useScreen} from "~/composables/useScreen";

const screen = useScreen()
const utilsStore = useUtils()

const statuses = computed(() => {
  return SnackbarStatus
})

const items = computed(() => {
  return utilsStore.snackbarItems
})

const deleteNote = (timestamp = 0) => {
  utilsStore.deleteSnackbarItem(timestamp)
}
</script>

<style lang="scss" scoped>
@import "/assets/sass/snackbar/variables";

.snackbar {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 203;
  width: 350px;

  &--m {
    width: calc(100vw - 20px);
  }

  &__item {
    border-radius: 0.25rem;
    background-color: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(0, 0, 0, 0.2);
    min-height: 45px;
    box-shadow: 0 0.25rem 0.75rem rgb(0 0 0 / 10%);
    overflow: hidden;
    display: flex !important;
  }
}

.list-complete-item {
  transition: all 250ms;
  display: block;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-complete-leave-active {
  position: absolute;
}

.font-normal {
  font-size: 35px;
}

.c-flash_icon {
  width: 1em;
  min-width: 1em;
  height: 1em;
  border: 0.1em solid transparent;
  border-radius: 50%;
  padding: 0;
  position: relative;
  cursor: default;
  user-select: none;

  &.c-flash_icon--warning,
  &.c-flash_icon--simple,
  &.c-flash_icon--info {
    text-align: center;

    .letter {
      font-size: 0.75em;
      line-height: 1.1em;
    }
  }

  &.c-flash_icon--warning {
    color: $color-warning;
    border-color: $color-warning-light;
  }

  &.c-flash_icon--info {
    color: $color-info;
    border-color: $color-info-light;
  }

  &.c-flash_icon--simple {
    color: $color-simple;
    border-color: $color-simple-light;
  }

  &.c-flash_icon--error {
    border-color: $color-error-light;

    .x-mark {
      position: absolute;
      font-size: $icon-size*$size;
      height: 1em;
      width: 1em;
      top: calc(calc(1 - $icon-size) * $size / (2 * $icon-size));
      left: calc(calc(1 - $icon-size) * $size / (2 * $icon-size));
    }

    .line {
      position: absolute;
      height: calc(0.1 * $size / $icon-size);
      width: 1.2em; //calc(sqrt($error-size*$error-size*$size/2));
      background-color: $color-error;
      display: block;
      top: calc(0.5 - 0.05 / $icon-size) * $size;
      border-radius: 0.025em;

      &.left {
        transform: rotate(45deg);
        left: -0.1em;
      }

      &.right {
        transform: rotate(-45deg);
        right: -0.1em;
      }
    }

    &.animate {
      animation: animate-error-icon 0.5s;

      .x-mark {
        animation: animate-x-mark 0.5s;
      }
    }
  }

  &.c-flash_icon--success {
    border-color: $color-success;

    &::before,
    &::after { // Emulate moving circular line
      content: '';
      border-radius: 50%;
      position: absolute;
      width: 0.7em;
      height: 1em;
      background: $color-background;
      transform: rotate(45deg);
    }

    &::before {
      border-radius: 1em 0 0 1em;
      width: 0.5em;
      top: 0.2125em;
      left: -0.15em;
      transform: rotate(-45deg);
      //      transform-origin: .75em .75em;
      //background: #dac;
    }

    &::after {
      border-radius: 0 1em 1em 0;
      top: 0.04em;
      left: 0.265em;
      transform: rotate(-45deg);
      transform-origin: 0 0.5em;
      //background: #000;
    }

    .placeholder { // Ring
      width: 1em;
      height: 1em;
      border: 0.1em solid $color-success-light;
      border-radius: 50%;
      position: absolute;
      left: -0.1em;
      top: -0.1em;
      z-index: 2;
    }

    .fix { // Hide corners left from animation
      width: 0.1em;
      height: 1em;
      background-color: $color-background;
      position: absolute;
      left: 0.175em;
      top: 0.05em;
      z-index: 1;
      transform: rotate(-45deg);
    }

    .line {
      height: 0.1em;
      background-color: $color-success;
      display: block;
      border-radius: 0.025em;
      position: absolute;
      z-index: 2;

      &.tip {
        width: 0.3125em;
        left: 0.05em;
        top: 0.475em;
        transform: rotate(45deg);
        background-color: $color-success;
      }

      &.long {
        width: 0.5875em;
        right: 0.05em;
        top: 0.375em;
        transform: rotate(-45deg);
      }
    }

    &.animate {
      &::after {
        animation: rotatePlaceholder 4.25s ease-in;
      }

      .tip {
        animation: animate-success-tip 1s;
      }

      .long {
        animation: animate-success-long 1s;
      }
    }
  }
}

// Success icon animation

@keyframes animate-success-tip {
  0% {
    width: 0;
    left: 0.0125em;
    top: 0.1375em;
  }

  54% {
    width: 0;
    left: 0.0125em;
    top: 0.1375em;
  }

  70% {
    width: 0.475em;
    left: -0.1em;
    top: 0.4em;
  }

  84% {
    width: 0.2375em;
    left: 0.12em;
    top: 0.5em;
  }

  100% {
    width: 0.3125em;
    left: 0.05em;
    top: 0.475em;
  }
}

@keyframes animate-success-long {
  0% {
    width: 0;
    right: 0.55em;
    top: 0.575em;
  }

  65% {
    width: 0;
    right: 0.55em;
    top: 0.575em;
  }

  84% {
    width: 0.65em;
    right: 0;
    top: 0.35em;
  }

  100% {
    width: 0.5875em;
    right: 0.05em;
    top: 0.375em;
  }
}

@keyframes rotatePlaceholder {
  0% {
    transform: rotate(-45deg);
  }

  5% {
    transform: rotate(-45deg);
  }

  12% {
    transform: rotate(-405deg);
  }

  100% {
    transform: rotate(-405deg);
  }
}

// Error icon animation

@keyframes animate-error-icon {
  0% {
    transform: rotateX(100deg);
    opacity: 0;
  }

  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
}

@keyframes animate-x-mark {
  0% {
    transform: scale(0.4);
    margin-top: 0.325em;
    opacity: 0;
  }

  50% {
    transform: scale(0.4);
    margin-top: 0.325em;
    opacity: 0;
  }

  80% {
    transform: scale(1.15);
    margin-top: -0.075em;
  }

  100% {
    transform: scale(1);
    margin-top: 0;
    opacity: 1;
  }
}
</style>
