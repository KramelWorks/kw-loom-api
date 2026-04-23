export interface IAppMapper<Domain, Input, Output> {
  toDomain(input: Input): Domain

  toDto(input: Domain): Output
}
