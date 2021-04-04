<template>
    <ul class="menu">
        <li v-for="(segment, index) in segments" :key="segment" :class="{ 'active': modelValue === index }" @click="$emit('update:modelValue', index)">
            <div class="name">
                {{ segment }}
            </div>
            <div class="indicator"></div>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Menu',
    emits: ['update:modelValue'],
    props: {
        modelValue: Number
    },
    data() {
        return {
            segments: [
                'Home',
                'About',
                'Work'
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.menu {
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 15px;
    position: fixed;
    top: 50%;
    right: 20px;

    li {
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 0.2;
        transition: all 0.1s ease-in-out;
        cursor: default;
        user-select: none;

        .name {
            font-family: 'Poppins-Regular';
            font-size: 15px;
            color: $secondary-color;
        }

        .indicator {
            height: 15px;
            width: 15px;
            border: 2px solid $secondary-color;
            border-radius: 100%;
        }

        &.active {
            opacity: 1;

            .name {
                font-family: 'Poppins-Bold';
            }

            .indicator {
                background-color: $secondary-color;
            }
        }

        &:not(.active):hover {
            opacity: 0.8;
            cursor: pointer;
        }
    }
}

@media only screen and (max-width: 1000px) {
    .menu {
        top: 20px;
        left: 30px;
        flex-direction: row;
        gap: 25px;

        li {
            flex-direction: column;
            gap: 5px;

            .name {
                font-size: 20px;
            }

            .indicator {
                height: 2px;
                width: 100%;
                border-radius: 0;
                border-width: 0;
            }

            &:not(.active) {
                .indicator {
                    opacity: 0;
                }
            }
        }
    }
}
</style>