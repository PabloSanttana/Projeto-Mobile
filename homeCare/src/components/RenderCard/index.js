import React, {memo} from 'react';

import Card from '../Card';
import {textStatus} from '../../constants';

function index({BPM, PA, SaO2, RPM, user, active, isModal}) {
  function handleMonitoramento(values, historic = false) {
    return (
      <>
        <Card
          label={values.title}
          title={values.sigla}
          value={values.valor}
          name={user}
          state={values.status}
          historic={historic && values.data}
          isModal={isModal}
        />
      </>
    );
  }

  if (
    BPM.status === textStatus.severa ||
    PA.status === textStatus.severa ||
    SaO2.status === textStatus.severa
  ) {
    if (BPM.status === textStatus.severa) {
      return <>{handleMonitoramento(BPM, true)}</>;
    } else if (SaO2.status === textStatus.severa) {
      return <>{handleMonitoramento(SaO2)}</>;
    } else if (PA.status === textStatus.severa) {
      return <>{handleMonitoramento(PA, true)}</>;
    }
  } else if (active === 2) {
    return <>{handleMonitoramento(BPM, true)}</>;
  } else if (active === 3) {
    return <>{handleMonitoramento(PA, true)}</>;
  } else if (active === 1) {
    return <>{handleMonitoramento(SaO2)}</>;
  }
}
export default memo(index);
