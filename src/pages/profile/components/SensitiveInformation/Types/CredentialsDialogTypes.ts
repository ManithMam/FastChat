import { InformationDialogPropTypes } from "./InformationDialogPropTypes"

export interface credentialsDialogTypes {
    open: boolean,
    setOpen:  React.Dispatch<React.SetStateAction<boolean>>,
    setInformation?: React.Dispatch<React.SetStateAction<string>>,
    InformationDialog: (props: InformationDialogPropTypes) => JSX.Element
}
