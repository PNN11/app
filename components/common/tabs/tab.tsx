import { useTabsContext } from './hooks'
import { ITabsComponentProps } from './types'

interface ITabsTabProps extends Omit<ITabsComponentProps, 'className'> {
    className?: string
}

export const Tab = ({ name, className, children }: ITabsTabProps): JSX.Element => {
    const { activeTab } = useTabsContext()

    if (activeTab !== name) return null

    return <div className={className}>{children}</div>
}
