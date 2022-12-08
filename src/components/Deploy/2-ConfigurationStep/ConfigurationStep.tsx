import { useDeployContext } from 'src/contexts'
import { DeployMethodsEnum } from 'src/types/deployTypes'
import { RestartField, FilterField, OperationsField } from './Fields'
import { FormDisplay } from './FormDisplay'

type DeployModes = {
  [key in DeployMethodsEnum]: {
    title: string
    fieldList: any[]
  }
}

const deployModes: DeployModes = {
  [DeployMethodsEnum.ALL]: {
    title: 'Deploy All',
    fieldList: [FilterField, RestartField],
  },
  [DeployMethodsEnum.SOURCES]: {
    title: 'Deploy From Sources',
    fieldList: [OperationsField, FilterField, RestartField],
  },
  [DeployMethodsEnum.TARGETS]: {
    title: 'Deploy To Targets',
    fieldList: [OperationsField, FilterField, RestartField],
  },
  [DeployMethodsEnum.CUSTOM]: {
    title: 'Custom Deploy',
    fieldList: [OperationsField],
  },
}

export function ConfigurationStep() {
  const {
    state: { selectedDeployMode },
  } = useDeployContext()
  // Get the infos of the selected deploy method
  const { title, fieldList } = deployModes[selectedDeployMode]

  return <FormDisplay title={title} fieldsList={fieldList} />
}
