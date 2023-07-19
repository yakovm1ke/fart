export enum Theme {
  Normal = 'Normal',
  Barbie = 'Barbie'
}

export type ThemeVariables = {
  main: string
}

export type ThemeOption = {
  key: Theme,
  title: string
  vars: ThemeVariables
  disabled?: boolean
}

export const DEFAULT_THEME: Theme = Theme.Normal

const getRequiredVariables = (vars: Partial<ThemeVariables> = {}): ThemeVariables => {
	return {
		main: vars.main ?? '',
	}
}

export const themeOptions: ThemeOption[] = [
	{
		key: Theme.Normal,
		title: 'Normal',
		vars: getRequiredVariables(),
	},
	{
		key: Theme.Barbie,
		title: 'Barbie',
		vars: getRequiredVariables({
			main: '#F092DD',
		}),
	},
]