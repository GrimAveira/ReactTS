import { AppDispatch } from "..";
import AreaService from "../../API/AreaService";
import StreetService from "../../API/StreetService";
import { ISignal } from "../../interface";
import { necRegDataSlice } from "./NecRegDataSlice";

export const fetchNecRegData =
  (params: ISignal) => async (dispatch: AppDispatch) => {
    dispatch(necRegDataSlice.actions.necRegDataFetching());
    const area = AreaService.getAll(params);
    const street = StreetService.getAll(params);
    Promise.all([area, street])
      .then((value) => {
        const area = value[0];
        const street = value[1];
        dispatch(
          necRegDataSlice.actions.necRegDataFetchingSuccess({ area, street })
        );
      })
      .catch((error: any) =>
        dispatch(necRegDataSlice.actions.necRegDataFetchingError(error.message))
      );
  };
