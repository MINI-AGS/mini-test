export type RootStackParamList = {
  Home: undefined;
  Questions: undefined;
  EndScreen: { answers: Record<string, any> };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
