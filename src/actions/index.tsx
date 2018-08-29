import * as constants from '../constants';

export interface ResetErrorMessage {
    type: constants.RESET_ERROR_MESSAGE;
    error?: string
}

export const resetErrorMessage = (): ResetErrorMessage => ({
    type: constants.RESET_ERROR_MESSAGE
})