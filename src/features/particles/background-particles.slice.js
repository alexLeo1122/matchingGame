import { createSlice } from '@reduxjs/toolkit';
import { basedMainParticles } from '../../utils/basedData.ultils';
export const particlesSlice = createSlice({
    name: 'particles',
    initialState: {
        main: basedMainParticles,
    },
    reducers: {
        setMainParcDecrement: (state, { payload }) => {
            state.main -= payload;
        },
        setMainParcIncrement: (state, { payload }) => {
            state.main += payload;
        },
        setMainParcReset: (state) => {
            // let a = state.value;
            state.main = basedMainParticles;
        },
    },
});

export const { setMainParcDecrement, setMainParcIncrement, setMainParcReset } = particlesSlice.actions;

export const selectMainParticles = (state) => state.particles.main;

export default particlesSlice.reducer;
