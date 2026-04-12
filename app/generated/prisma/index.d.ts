
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Member
 * 
 */
export type Member = $Result.DefaultSelection<Prisma.$MemberPayload>
/**
 * Model GlobalSettings
 * 
 */
export type GlobalSettings = $Result.DefaultSelection<Prisma.$GlobalSettingsPayload>
/**
 * Model MemberLoan
 * 
 */
export type MemberLoan = $Result.DefaultSelection<Prisma.$MemberLoanPayload>
/**
 * Model MemberTransaction
 * 
 */
export type MemberTransaction = $Result.DefaultSelection<Prisma.$MemberTransactionPayload>
/**
 * Model MonthlyReport
 * 
 */
export type MonthlyReport = $Result.DefaultSelection<Prisma.$MonthlyReportPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const LoanStatus: {
  ACTIVE: 'ACTIVE',
  PAID: 'PAID',
  DEFAULTED: 'DEFAULTED'
};

export type LoanStatus = (typeof LoanStatus)[keyof typeof LoanStatus]


export const TransactionType: {
  CONTRIB: 'CONTRIB',
  INT_PAID: 'INT_PAID',
  PRIN_REPAY: 'PRIN_REPAY',
  NEW_LOAN: 'NEW_LOAN'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]

}

export type LoanStatus = $Enums.LoanStatus

export const LoanStatus: typeof $Enums.LoanStatus

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Members
 * const members = await prisma.member.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Members
   * const members = await prisma.member.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.member`: Exposes CRUD operations for the **Member** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Members
    * const members = await prisma.member.findMany()
    * ```
    */
  get member(): Prisma.MemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.globalSettings`: Exposes CRUD operations for the **GlobalSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GlobalSettings
    * const globalSettings = await prisma.globalSettings.findMany()
    * ```
    */
  get globalSettings(): Prisma.GlobalSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.memberLoan`: Exposes CRUD operations for the **MemberLoan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MemberLoans
    * const memberLoans = await prisma.memberLoan.findMany()
    * ```
    */
  get memberLoan(): Prisma.MemberLoanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.memberTransaction`: Exposes CRUD operations for the **MemberTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MemberTransactions
    * const memberTransactions = await prisma.memberTransaction.findMany()
    * ```
    */
  get memberTransaction(): Prisma.MemberTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.monthlyReport`: Exposes CRUD operations for the **MonthlyReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MonthlyReports
    * const monthlyReports = await prisma.monthlyReport.findMany()
    * ```
    */
  get monthlyReport(): Prisma.MonthlyReportDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Member: 'Member',
    GlobalSettings: 'GlobalSettings',
    MemberLoan: 'MemberLoan',
    MemberTransaction: 'MemberTransaction',
    MonthlyReport: 'MonthlyReport'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "member" | "globalSettings" | "memberLoan" | "memberTransaction" | "monthlyReport"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Member: {
        payload: Prisma.$MemberPayload<ExtArgs>
        fields: Prisma.MemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findFirst: {
            args: Prisma.MemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findMany: {
            args: Prisma.MemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          create: {
            args: Prisma.MemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          createMany: {
            args: Prisma.MemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          delete: {
            args: Prisma.MemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          update: {
            args: Prisma.MemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          deleteMany: {
            args: Prisma.MemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          upsert: {
            args: Prisma.MemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          aggregate: {
            args: Prisma.MemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMember>
          }
          groupBy: {
            args: Prisma.MemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberCountArgs<ExtArgs>
            result: $Utils.Optional<MemberCountAggregateOutputType> | number
          }
        }
      }
      GlobalSettings: {
        payload: Prisma.$GlobalSettingsPayload<ExtArgs>
        fields: Prisma.GlobalSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GlobalSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GlobalSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          findFirst: {
            args: Prisma.GlobalSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GlobalSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          findMany: {
            args: Prisma.GlobalSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>[]
          }
          create: {
            args: Prisma.GlobalSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          createMany: {
            args: Prisma.GlobalSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GlobalSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>[]
          }
          delete: {
            args: Prisma.GlobalSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          update: {
            args: Prisma.GlobalSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          deleteMany: {
            args: Prisma.GlobalSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GlobalSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GlobalSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>[]
          }
          upsert: {
            args: Prisma.GlobalSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          aggregate: {
            args: Prisma.GlobalSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGlobalSettings>
          }
          groupBy: {
            args: Prisma.GlobalSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<GlobalSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.GlobalSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<GlobalSettingsCountAggregateOutputType> | number
          }
        }
      }
      MemberLoan: {
        payload: Prisma.$MemberLoanPayload<ExtArgs>
        fields: Prisma.MemberLoanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberLoanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberLoanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberLoanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberLoanPayload>
          }
          findFirst: {
            args: Prisma.MemberLoanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberLoanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberLoanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberLoanPayload>
          }
          findMany: {
            args: Prisma.MemberLoanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberLoanPayload>[]
          }
          create: {
            args: Prisma.MemberLoanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberLoanPayload>
          }
          createMany: {
            args: Prisma.MemberLoanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemberLoanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberLoanPayload>[]
          }
          delete: {
            args: Prisma.MemberLoanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberLoanPayload>
          }
          update: {
            args: Prisma.MemberLoanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberLoanPayload>
          }
          deleteMany: {
            args: Prisma.MemberLoanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberLoanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemberLoanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberLoanPayload>[]
          }
          upsert: {
            args: Prisma.MemberLoanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberLoanPayload>
          }
          aggregate: {
            args: Prisma.MemberLoanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemberLoan>
          }
          groupBy: {
            args: Prisma.MemberLoanGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberLoanGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberLoanCountArgs<ExtArgs>
            result: $Utils.Optional<MemberLoanCountAggregateOutputType> | number
          }
        }
      }
      MemberTransaction: {
        payload: Prisma.$MemberTransactionPayload<ExtArgs>
        fields: Prisma.MemberTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberTransactionPayload>
          }
          findFirst: {
            args: Prisma.MemberTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberTransactionPayload>
          }
          findMany: {
            args: Prisma.MemberTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberTransactionPayload>[]
          }
          create: {
            args: Prisma.MemberTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberTransactionPayload>
          }
          createMany: {
            args: Prisma.MemberTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemberTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberTransactionPayload>[]
          }
          delete: {
            args: Prisma.MemberTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberTransactionPayload>
          }
          update: {
            args: Prisma.MemberTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberTransactionPayload>
          }
          deleteMany: {
            args: Prisma.MemberTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemberTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberTransactionPayload>[]
          }
          upsert: {
            args: Prisma.MemberTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberTransactionPayload>
          }
          aggregate: {
            args: Prisma.MemberTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemberTransaction>
          }
          groupBy: {
            args: Prisma.MemberTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<MemberTransactionCountAggregateOutputType> | number
          }
        }
      }
      MonthlyReport: {
        payload: Prisma.$MonthlyReportPayload<ExtArgs>
        fields: Prisma.MonthlyReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MonthlyReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MonthlyReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          findFirst: {
            args: Prisma.MonthlyReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MonthlyReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          findMany: {
            args: Prisma.MonthlyReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>[]
          }
          create: {
            args: Prisma.MonthlyReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          createMany: {
            args: Prisma.MonthlyReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MonthlyReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>[]
          }
          delete: {
            args: Prisma.MonthlyReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          update: {
            args: Prisma.MonthlyReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          deleteMany: {
            args: Prisma.MonthlyReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MonthlyReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MonthlyReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>[]
          }
          upsert: {
            args: Prisma.MonthlyReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          aggregate: {
            args: Prisma.MonthlyReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMonthlyReport>
          }
          groupBy: {
            args: Prisma.MonthlyReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<MonthlyReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.MonthlyReportCountArgs<ExtArgs>
            result: $Utils.Optional<MonthlyReportCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    member?: MemberOmit
    globalSettings?: GlobalSettingsOmit
    memberLoan?: MemberLoanOmit
    memberTransaction?: MemberTransactionOmit
    monthlyReport?: MonthlyReportOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MemberCountOutputType
   */

  export type MemberCountOutputType = {
    loans: number
    transactions: number
  }

  export type MemberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loans?: boolean | MemberCountOutputTypeCountLoansArgs
    transactions?: boolean | MemberCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCountOutputType
     */
    select?: MemberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberLoanWhereInput
  }

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberTransactionWhereInput
  }


  /**
   * Count Type MemberLoanCountOutputType
   */

  export type MemberLoanCountOutputType = {
    transactions: number
  }

  export type MemberLoanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | MemberLoanCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * MemberLoanCountOutputType without action
   */
  export type MemberLoanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberLoanCountOutputType
     */
    select?: MemberLoanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MemberLoanCountOutputType without action
   */
  export type MemberLoanCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberTransactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Member
   */

  export type AggregateMember = {
    _count: MemberCountAggregateOutputType | null
    _avg: MemberAvgAggregateOutputType | null
    _sum: MemberSumAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  export type MemberAvgAggregateOutputType = {
    id: number | null
  }

  export type MemberSumAggregateOutputType = {
    id: number | null
  }

  export type MemberMinAggregateOutputType = {
    id: number | null
    memberId: string | null
    name: string | null
    phone: string | null
    email: string | null
    clerkId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberMaxAggregateOutputType = {
    id: number | null
    memberId: string | null
    name: string | null
    phone: string | null
    email: string | null
    clerkId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberCountAggregateOutputType = {
    id: number
    memberId: number
    name: number
    phone: number
    email: number
    clerkId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MemberAvgAggregateInputType = {
    id?: true
  }

  export type MemberSumAggregateInputType = {
    id?: true
  }

  export type MemberMinAggregateInputType = {
    id?: true
    memberId?: true
    name?: true
    phone?: true
    email?: true
    clerkId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberMaxAggregateInputType = {
    id?: true
    memberId?: true
    name?: true
    phone?: true
    email?: true
    clerkId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberCountAggregateInputType = {
    id?: true
    memberId?: true
    name?: true
    phone?: true
    email?: true
    clerkId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Member to aggregate.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Members
    **/
    _count?: true | MemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MemberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MemberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberMaxAggregateInputType
  }

  export type GetMemberAggregateType<T extends MemberAggregateArgs> = {
        [P in keyof T & keyof AggregateMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMember[P]>
      : GetScalarType<T[P], AggregateMember[P]>
  }




  export type MemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberWhereInput
    orderBy?: MemberOrderByWithAggregationInput | MemberOrderByWithAggregationInput[]
    by: MemberScalarFieldEnum[] | MemberScalarFieldEnum
    having?: MemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberCountAggregateInputType | true
    _avg?: MemberAvgAggregateInputType
    _sum?: MemberSumAggregateInputType
    _min?: MemberMinAggregateInputType
    _max?: MemberMaxAggregateInputType
  }

  export type MemberGroupByOutputType = {
    id: number
    memberId: string
    name: string
    phone: string | null
    email: string | null
    clerkId: string
    createdAt: Date
    updatedAt: Date
    _count: MemberCountAggregateOutputType | null
    _avg: MemberAvgAggregateOutputType | null
    _sum: MemberSumAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  type GetMemberGroupByPayload<T extends MemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberGroupByOutputType[P]>
            : GetScalarType<T[P], MemberGroupByOutputType[P]>
        }
      >
    >


  export type MemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    clerkId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loans?: boolean | Member$loansArgs<ExtArgs>
    transactions?: boolean | Member$transactionsArgs<ExtArgs>
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["member"]>

  export type MemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    clerkId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["member"]>

  export type MemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    clerkId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["member"]>

  export type MemberSelectScalar = {
    id?: boolean
    memberId?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    clerkId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "memberId" | "name" | "phone" | "email" | "clerkId" | "createdAt" | "updatedAt", ExtArgs["result"]["member"]>
  export type MemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loans?: boolean | Member$loansArgs<ExtArgs>
    transactions?: boolean | Member$transactionsArgs<ExtArgs>
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Member"
    objects: {
      loans: Prisma.$MemberLoanPayload<ExtArgs>[]
      transactions: Prisma.$MemberTransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      memberId: string
      name: string
      phone: string | null
      email: string | null
      clerkId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["member"]>
    composites: {}
  }

  type MemberGetPayload<S extends boolean | null | undefined | MemberDefaultArgs> = $Result.GetResult<Prisma.$MemberPayload, S>

  type MemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemberCountAggregateInputType | true
    }

  export interface MemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Member'], meta: { name: 'Member' } }
    /**
     * Find zero or one Member that matches the filter.
     * @param {MemberFindUniqueArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemberFindUniqueArgs>(args: SelectSubset<T, MemberFindUniqueArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Member that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemberFindUniqueOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemberFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Member that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemberFindFirstArgs>(args?: SelectSubset<T, MemberFindFirstArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Member that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemberFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Members that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Members
     * const members = await prisma.member.findMany()
     * 
     * // Get first 10 Members
     * const members = await prisma.member.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberWithIdOnly = await prisma.member.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemberFindManyArgs>(args?: SelectSubset<T, MemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Member.
     * @param {MemberCreateArgs} args - Arguments to create a Member.
     * @example
     * // Create one Member
     * const Member = await prisma.member.create({
     *   data: {
     *     // ... data to create a Member
     *   }
     * })
     * 
     */
    create<T extends MemberCreateArgs>(args: SelectSubset<T, MemberCreateArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Members.
     * @param {MemberCreateManyArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemberCreateManyArgs>(args?: SelectSubset<T, MemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Members and returns the data saved in the database.
     * @param {MemberCreateManyAndReturnArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Members and only return the `id`
     * const memberWithIdOnly = await prisma.member.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemberCreateManyAndReturnArgs>(args?: SelectSubset<T, MemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Member.
     * @param {MemberDeleteArgs} args - Arguments to delete one Member.
     * @example
     * // Delete one Member
     * const Member = await prisma.member.delete({
     *   where: {
     *     // ... filter to delete one Member
     *   }
     * })
     * 
     */
    delete<T extends MemberDeleteArgs>(args: SelectSubset<T, MemberDeleteArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Member.
     * @param {MemberUpdateArgs} args - Arguments to update one Member.
     * @example
     * // Update one Member
     * const member = await prisma.member.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemberUpdateArgs>(args: SelectSubset<T, MemberUpdateArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Members.
     * @param {MemberDeleteManyArgs} args - Arguments to filter Members to delete.
     * @example
     * // Delete a few Members
     * const { count } = await prisma.member.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemberDeleteManyArgs>(args?: SelectSubset<T, MemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Members
     * const member = await prisma.member.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemberUpdateManyArgs>(args: SelectSubset<T, MemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Members and returns the data updated in the database.
     * @param {MemberUpdateManyAndReturnArgs} args - Arguments to update many Members.
     * @example
     * // Update many Members
     * const member = await prisma.member.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Members and only return the `id`
     * const memberWithIdOnly = await prisma.member.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MemberUpdateManyAndReturnArgs>(args: SelectSubset<T, MemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Member.
     * @param {MemberUpsertArgs} args - Arguments to update or create a Member.
     * @example
     * // Update or create a Member
     * const member = await prisma.member.upsert({
     *   create: {
     *     // ... data to create a Member
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Member we want to update
     *   }
     * })
     */
    upsert<T extends MemberUpsertArgs>(args: SelectSubset<T, MemberUpsertArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCountArgs} args - Arguments to filter Members to count.
     * @example
     * // Count the number of Members
     * const count = await prisma.member.count({
     *   where: {
     *     // ... the filter for the Members we want to count
     *   }
     * })
    **/
    count<T extends MemberCountArgs>(
      args?: Subset<T, MemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemberAggregateArgs>(args: Subset<T, MemberAggregateArgs>): Prisma.PrismaPromise<GetMemberAggregateType<T>>

    /**
     * Group by Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberGroupByArgs['orderBy'] }
        : { orderBy?: MemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Member model
   */
  readonly fields: MemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Member.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loans<T extends Member$loansArgs<ExtArgs> = {}>(args?: Subset<T, Member$loansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberLoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends Member$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Member$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Member model
   */
  interface MemberFieldRefs {
    readonly id: FieldRef<"Member", 'Int'>
    readonly memberId: FieldRef<"Member", 'String'>
    readonly name: FieldRef<"Member", 'String'>
    readonly phone: FieldRef<"Member", 'String'>
    readonly email: FieldRef<"Member", 'String'>
    readonly clerkId: FieldRef<"Member", 'String'>
    readonly createdAt: FieldRef<"Member", 'DateTime'>
    readonly updatedAt: FieldRef<"Member", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Member findUnique
   */
  export type MemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member findUniqueOrThrow
   */
  export type MemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member findFirst
   */
  export type MemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member findFirstOrThrow
   */
  export type MemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member findMany
   */
  export type MemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Members to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member create
   */
  export type MemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The data needed to create a Member.
     */
    data: XOR<MemberCreateInput, MemberUncheckedCreateInput>
  }

  /**
   * Member createMany
   */
  export type MemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Member createManyAndReturn
   */
  export type MemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Member update
   */
  export type MemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The data needed to update a Member.
     */
    data: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
    /**
     * Choose, which Member to update.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member updateMany
   */
  export type MemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Members.
     */
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyInput>
    /**
     * Filter which Members to update
     */
    where?: MemberWhereInput
    /**
     * Limit how many Members to update.
     */
    limit?: number
  }

  /**
   * Member updateManyAndReturn
   */
  export type MemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * The data used to update Members.
     */
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyInput>
    /**
     * Filter which Members to update
     */
    where?: MemberWhereInput
    /**
     * Limit how many Members to update.
     */
    limit?: number
  }

  /**
   * Member upsert
   */
  export type MemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The filter to search for the Member to update in case it exists.
     */
    where: MemberWhereUniqueInput
    /**
     * In case the Member found by the `where` argument doesn't exist, create a new Member with this data.
     */
    create: XOR<MemberCreateInput, MemberUncheckedCreateInput>
    /**
     * In case the Member was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
  }

  /**
   * Member delete
   */
  export type MemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter which Member to delete.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member deleteMany
   */
  export type MemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Members to delete
     */
    where?: MemberWhereInput
    /**
     * Limit how many Members to delete.
     */
    limit?: number
  }

  /**
   * Member.loans
   */
  export type Member$loansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberLoan
     */
    select?: MemberLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberLoan
     */
    omit?: MemberLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberLoanInclude<ExtArgs> | null
    where?: MemberLoanWhereInput
    orderBy?: MemberLoanOrderByWithRelationInput | MemberLoanOrderByWithRelationInput[]
    cursor?: MemberLoanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberLoanScalarFieldEnum | MemberLoanScalarFieldEnum[]
  }

  /**
   * Member.transactions
   */
  export type Member$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberTransaction
     */
    select?: MemberTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberTransaction
     */
    omit?: MemberTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberTransactionInclude<ExtArgs> | null
    where?: MemberTransactionWhereInput
    orderBy?: MemberTransactionOrderByWithRelationInput | MemberTransactionOrderByWithRelationInput[]
    cursor?: MemberTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberTransactionScalarFieldEnum | MemberTransactionScalarFieldEnum[]
  }

  /**
   * Member without action
   */
  export type MemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
  }


  /**
   * Model GlobalSettings
   */

  export type AggregateGlobalSettings = {
    _count: GlobalSettingsCountAggregateOutputType | null
    _avg: GlobalSettingsAvgAggregateOutputType | null
    _sum: GlobalSettingsSumAggregateOutputType | null
    _min: GlobalSettingsMinAggregateOutputType | null
    _max: GlobalSettingsMaxAggregateOutputType | null
  }

  export type GlobalSettingsAvgAggregateOutputType = {
    id: number | null
    monthlyContribution: number | null
    memberInterestRate: number | null
    marketInterestRate: number | null
  }

  export type GlobalSettingsSumAggregateOutputType = {
    id: number | null
    monthlyContribution: number | null
    memberInterestRate: number | null
    marketInterestRate: number | null
  }

  export type GlobalSettingsMinAggregateOutputType = {
    id: number | null
    monthlyContribution: number | null
    memberInterestRate: number | null
    marketInterestRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GlobalSettingsMaxAggregateOutputType = {
    id: number | null
    monthlyContribution: number | null
    memberInterestRate: number | null
    marketInterestRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GlobalSettingsCountAggregateOutputType = {
    id: number
    monthlyContribution: number
    memberInterestRate: number
    marketInterestRate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GlobalSettingsAvgAggregateInputType = {
    id?: true
    monthlyContribution?: true
    memberInterestRate?: true
    marketInterestRate?: true
  }

  export type GlobalSettingsSumAggregateInputType = {
    id?: true
    monthlyContribution?: true
    memberInterestRate?: true
    marketInterestRate?: true
  }

  export type GlobalSettingsMinAggregateInputType = {
    id?: true
    monthlyContribution?: true
    memberInterestRate?: true
    marketInterestRate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GlobalSettingsMaxAggregateInputType = {
    id?: true
    monthlyContribution?: true
    memberInterestRate?: true
    marketInterestRate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GlobalSettingsCountAggregateInputType = {
    id?: true
    monthlyContribution?: true
    memberInterestRate?: true
    marketInterestRate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GlobalSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalSettings to aggregate.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GlobalSettings
    **/
    _count?: true | GlobalSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GlobalSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GlobalSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GlobalSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GlobalSettingsMaxAggregateInputType
  }

  export type GetGlobalSettingsAggregateType<T extends GlobalSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateGlobalSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGlobalSettings[P]>
      : GetScalarType<T[P], AggregateGlobalSettings[P]>
  }




  export type GlobalSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GlobalSettingsWhereInput
    orderBy?: GlobalSettingsOrderByWithAggregationInput | GlobalSettingsOrderByWithAggregationInput[]
    by: GlobalSettingsScalarFieldEnum[] | GlobalSettingsScalarFieldEnum
    having?: GlobalSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GlobalSettingsCountAggregateInputType | true
    _avg?: GlobalSettingsAvgAggregateInputType
    _sum?: GlobalSettingsSumAggregateInputType
    _min?: GlobalSettingsMinAggregateInputType
    _max?: GlobalSettingsMaxAggregateInputType
  }

  export type GlobalSettingsGroupByOutputType = {
    id: number
    monthlyContribution: number
    memberInterestRate: number
    marketInterestRate: number
    createdAt: Date
    updatedAt: Date
    _count: GlobalSettingsCountAggregateOutputType | null
    _avg: GlobalSettingsAvgAggregateOutputType | null
    _sum: GlobalSettingsSumAggregateOutputType | null
    _min: GlobalSettingsMinAggregateOutputType | null
    _max: GlobalSettingsMaxAggregateOutputType | null
  }

  type GetGlobalSettingsGroupByPayload<T extends GlobalSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GlobalSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GlobalSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GlobalSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], GlobalSettingsGroupByOutputType[P]>
        }
      >
    >


  export type GlobalSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    monthlyContribution?: boolean
    memberInterestRate?: boolean
    marketInterestRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["globalSettings"]>

  export type GlobalSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    monthlyContribution?: boolean
    memberInterestRate?: boolean
    marketInterestRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["globalSettings"]>

  export type GlobalSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    monthlyContribution?: boolean
    memberInterestRate?: boolean
    marketInterestRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["globalSettings"]>

  export type GlobalSettingsSelectScalar = {
    id?: boolean
    monthlyContribution?: boolean
    memberInterestRate?: boolean
    marketInterestRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GlobalSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "monthlyContribution" | "memberInterestRate" | "marketInterestRate" | "createdAt" | "updatedAt", ExtArgs["result"]["globalSettings"]>

  export type $GlobalSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GlobalSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      monthlyContribution: number
      memberInterestRate: number
      marketInterestRate: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["globalSettings"]>
    composites: {}
  }

  type GlobalSettingsGetPayload<S extends boolean | null | undefined | GlobalSettingsDefaultArgs> = $Result.GetResult<Prisma.$GlobalSettingsPayload, S>

  type GlobalSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GlobalSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GlobalSettingsCountAggregateInputType | true
    }

  export interface GlobalSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GlobalSettings'], meta: { name: 'GlobalSettings' } }
    /**
     * Find zero or one GlobalSettings that matches the filter.
     * @param {GlobalSettingsFindUniqueArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GlobalSettingsFindUniqueArgs>(args: SelectSubset<T, GlobalSettingsFindUniqueArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GlobalSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GlobalSettingsFindUniqueOrThrowArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GlobalSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, GlobalSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GlobalSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsFindFirstArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GlobalSettingsFindFirstArgs>(args?: SelectSubset<T, GlobalSettingsFindFirstArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GlobalSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsFindFirstOrThrowArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GlobalSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, GlobalSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GlobalSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GlobalSettings
     * const globalSettings = await prisma.globalSettings.findMany()
     * 
     * // Get first 10 GlobalSettings
     * const globalSettings = await prisma.globalSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const globalSettingsWithIdOnly = await prisma.globalSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GlobalSettingsFindManyArgs>(args?: SelectSubset<T, GlobalSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GlobalSettings.
     * @param {GlobalSettingsCreateArgs} args - Arguments to create a GlobalSettings.
     * @example
     * // Create one GlobalSettings
     * const GlobalSettings = await prisma.globalSettings.create({
     *   data: {
     *     // ... data to create a GlobalSettings
     *   }
     * })
     * 
     */
    create<T extends GlobalSettingsCreateArgs>(args: SelectSubset<T, GlobalSettingsCreateArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GlobalSettings.
     * @param {GlobalSettingsCreateManyArgs} args - Arguments to create many GlobalSettings.
     * @example
     * // Create many GlobalSettings
     * const globalSettings = await prisma.globalSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GlobalSettingsCreateManyArgs>(args?: SelectSubset<T, GlobalSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GlobalSettings and returns the data saved in the database.
     * @param {GlobalSettingsCreateManyAndReturnArgs} args - Arguments to create many GlobalSettings.
     * @example
     * // Create many GlobalSettings
     * const globalSettings = await prisma.globalSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GlobalSettings and only return the `id`
     * const globalSettingsWithIdOnly = await prisma.globalSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GlobalSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, GlobalSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GlobalSettings.
     * @param {GlobalSettingsDeleteArgs} args - Arguments to delete one GlobalSettings.
     * @example
     * // Delete one GlobalSettings
     * const GlobalSettings = await prisma.globalSettings.delete({
     *   where: {
     *     // ... filter to delete one GlobalSettings
     *   }
     * })
     * 
     */
    delete<T extends GlobalSettingsDeleteArgs>(args: SelectSubset<T, GlobalSettingsDeleteArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GlobalSettings.
     * @param {GlobalSettingsUpdateArgs} args - Arguments to update one GlobalSettings.
     * @example
     * // Update one GlobalSettings
     * const globalSettings = await prisma.globalSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GlobalSettingsUpdateArgs>(args: SelectSubset<T, GlobalSettingsUpdateArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GlobalSettings.
     * @param {GlobalSettingsDeleteManyArgs} args - Arguments to filter GlobalSettings to delete.
     * @example
     * // Delete a few GlobalSettings
     * const { count } = await prisma.globalSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GlobalSettingsDeleteManyArgs>(args?: SelectSubset<T, GlobalSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GlobalSettings
     * const globalSettings = await prisma.globalSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GlobalSettingsUpdateManyArgs>(args: SelectSubset<T, GlobalSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GlobalSettings and returns the data updated in the database.
     * @param {GlobalSettingsUpdateManyAndReturnArgs} args - Arguments to update many GlobalSettings.
     * @example
     * // Update many GlobalSettings
     * const globalSettings = await prisma.globalSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GlobalSettings and only return the `id`
     * const globalSettingsWithIdOnly = await prisma.globalSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GlobalSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, GlobalSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GlobalSettings.
     * @param {GlobalSettingsUpsertArgs} args - Arguments to update or create a GlobalSettings.
     * @example
     * // Update or create a GlobalSettings
     * const globalSettings = await prisma.globalSettings.upsert({
     *   create: {
     *     // ... data to create a GlobalSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GlobalSettings we want to update
     *   }
     * })
     */
    upsert<T extends GlobalSettingsUpsertArgs>(args: SelectSubset<T, GlobalSettingsUpsertArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsCountArgs} args - Arguments to filter GlobalSettings to count.
     * @example
     * // Count the number of GlobalSettings
     * const count = await prisma.globalSettings.count({
     *   where: {
     *     // ... the filter for the GlobalSettings we want to count
     *   }
     * })
    **/
    count<T extends GlobalSettingsCountArgs>(
      args?: Subset<T, GlobalSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GlobalSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GlobalSettingsAggregateArgs>(args: Subset<T, GlobalSettingsAggregateArgs>): Prisma.PrismaPromise<GetGlobalSettingsAggregateType<T>>

    /**
     * Group by GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GlobalSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GlobalSettingsGroupByArgs['orderBy'] }
        : { orderBy?: GlobalSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GlobalSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGlobalSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GlobalSettings model
   */
  readonly fields: GlobalSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GlobalSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GlobalSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GlobalSettings model
   */
  interface GlobalSettingsFieldRefs {
    readonly id: FieldRef<"GlobalSettings", 'Int'>
    readonly monthlyContribution: FieldRef<"GlobalSettings", 'Float'>
    readonly memberInterestRate: FieldRef<"GlobalSettings", 'Float'>
    readonly marketInterestRate: FieldRef<"GlobalSettings", 'Float'>
    readonly createdAt: FieldRef<"GlobalSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"GlobalSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GlobalSettings findUnique
   */
  export type GlobalSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings findUniqueOrThrow
   */
  export type GlobalSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings findFirst
   */
  export type GlobalSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalSettings.
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalSettings.
     */
    distinct?: GlobalSettingsScalarFieldEnum | GlobalSettingsScalarFieldEnum[]
  }

  /**
   * GlobalSettings findFirstOrThrow
   */
  export type GlobalSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalSettings.
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalSettings.
     */
    distinct?: GlobalSettingsScalarFieldEnum | GlobalSettingsScalarFieldEnum[]
  }

  /**
   * GlobalSettings findMany
   */
  export type GlobalSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GlobalSettings.
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalSettings.
     */
    distinct?: GlobalSettingsScalarFieldEnum | GlobalSettingsScalarFieldEnum[]
  }

  /**
   * GlobalSettings create
   */
  export type GlobalSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a GlobalSettings.
     */
    data: XOR<GlobalSettingsCreateInput, GlobalSettingsUncheckedCreateInput>
  }

  /**
   * GlobalSettings createMany
   */
  export type GlobalSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GlobalSettings.
     */
    data: GlobalSettingsCreateManyInput | GlobalSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GlobalSettings createManyAndReturn
   */
  export type GlobalSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many GlobalSettings.
     */
    data: GlobalSettingsCreateManyInput | GlobalSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GlobalSettings update
   */
  export type GlobalSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a GlobalSettings.
     */
    data: XOR<GlobalSettingsUpdateInput, GlobalSettingsUncheckedUpdateInput>
    /**
     * Choose, which GlobalSettings to update.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings updateMany
   */
  export type GlobalSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GlobalSettings.
     */
    data: XOR<GlobalSettingsUpdateManyMutationInput, GlobalSettingsUncheckedUpdateManyInput>
    /**
     * Filter which GlobalSettings to update
     */
    where?: GlobalSettingsWhereInput
    /**
     * Limit how many GlobalSettings to update.
     */
    limit?: number
  }

  /**
   * GlobalSettings updateManyAndReturn
   */
  export type GlobalSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The data used to update GlobalSettings.
     */
    data: XOR<GlobalSettingsUpdateManyMutationInput, GlobalSettingsUncheckedUpdateManyInput>
    /**
     * Filter which GlobalSettings to update
     */
    where?: GlobalSettingsWhereInput
    /**
     * Limit how many GlobalSettings to update.
     */
    limit?: number
  }

  /**
   * GlobalSettings upsert
   */
  export type GlobalSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the GlobalSettings to update in case it exists.
     */
    where: GlobalSettingsWhereUniqueInput
    /**
     * In case the GlobalSettings found by the `where` argument doesn't exist, create a new GlobalSettings with this data.
     */
    create: XOR<GlobalSettingsCreateInput, GlobalSettingsUncheckedCreateInput>
    /**
     * In case the GlobalSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GlobalSettingsUpdateInput, GlobalSettingsUncheckedUpdateInput>
  }

  /**
   * GlobalSettings delete
   */
  export type GlobalSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter which GlobalSettings to delete.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings deleteMany
   */
  export type GlobalSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalSettings to delete
     */
    where?: GlobalSettingsWhereInput
    /**
     * Limit how many GlobalSettings to delete.
     */
    limit?: number
  }

  /**
   * GlobalSettings without action
   */
  export type GlobalSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
  }


  /**
   * Model MemberLoan
   */

  export type AggregateMemberLoan = {
    _count: MemberLoanCountAggregateOutputType | null
    _avg: MemberLoanAvgAggregateOutputType | null
    _sum: MemberLoanSumAggregateOutputType | null
    _min: MemberLoanMinAggregateOutputType | null
    _max: MemberLoanMaxAggregateOutputType | null
  }

  export type MemberLoanAvgAggregateOutputType = {
    amount: number | null
    interestRate: number | null
  }

  export type MemberLoanSumAggregateOutputType = {
    amount: number | null
    interestRate: number | null
  }

  export type MemberLoanMinAggregateOutputType = {
    id: string | null
    memberId: string | null
    amount: number | null
    interestRate: number | null
    status: $Enums.LoanStatus | null
    issuedAt: Date | null
  }

  export type MemberLoanMaxAggregateOutputType = {
    id: string | null
    memberId: string | null
    amount: number | null
    interestRate: number | null
    status: $Enums.LoanStatus | null
    issuedAt: Date | null
  }

  export type MemberLoanCountAggregateOutputType = {
    id: number
    memberId: number
    amount: number
    interestRate: number
    status: number
    issuedAt: number
    _all: number
  }


  export type MemberLoanAvgAggregateInputType = {
    amount?: true
    interestRate?: true
  }

  export type MemberLoanSumAggregateInputType = {
    amount?: true
    interestRate?: true
  }

  export type MemberLoanMinAggregateInputType = {
    id?: true
    memberId?: true
    amount?: true
    interestRate?: true
    status?: true
    issuedAt?: true
  }

  export type MemberLoanMaxAggregateInputType = {
    id?: true
    memberId?: true
    amount?: true
    interestRate?: true
    status?: true
    issuedAt?: true
  }

  export type MemberLoanCountAggregateInputType = {
    id?: true
    memberId?: true
    amount?: true
    interestRate?: true
    status?: true
    issuedAt?: true
    _all?: true
  }

  export type MemberLoanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemberLoan to aggregate.
     */
    where?: MemberLoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberLoans to fetch.
     */
    orderBy?: MemberLoanOrderByWithRelationInput | MemberLoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberLoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberLoans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberLoans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MemberLoans
    **/
    _count?: true | MemberLoanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MemberLoanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MemberLoanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberLoanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberLoanMaxAggregateInputType
  }

  export type GetMemberLoanAggregateType<T extends MemberLoanAggregateArgs> = {
        [P in keyof T & keyof AggregateMemberLoan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemberLoan[P]>
      : GetScalarType<T[P], AggregateMemberLoan[P]>
  }




  export type MemberLoanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberLoanWhereInput
    orderBy?: MemberLoanOrderByWithAggregationInput | MemberLoanOrderByWithAggregationInput[]
    by: MemberLoanScalarFieldEnum[] | MemberLoanScalarFieldEnum
    having?: MemberLoanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberLoanCountAggregateInputType | true
    _avg?: MemberLoanAvgAggregateInputType
    _sum?: MemberLoanSumAggregateInputType
    _min?: MemberLoanMinAggregateInputType
    _max?: MemberLoanMaxAggregateInputType
  }

  export type MemberLoanGroupByOutputType = {
    id: string
    memberId: string
    amount: number
    interestRate: number
    status: $Enums.LoanStatus
    issuedAt: Date
    _count: MemberLoanCountAggregateOutputType | null
    _avg: MemberLoanAvgAggregateOutputType | null
    _sum: MemberLoanSumAggregateOutputType | null
    _min: MemberLoanMinAggregateOutputType | null
    _max: MemberLoanMaxAggregateOutputType | null
  }

  type GetMemberLoanGroupByPayload<T extends MemberLoanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberLoanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberLoanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberLoanGroupByOutputType[P]>
            : GetScalarType<T[P], MemberLoanGroupByOutputType[P]>
        }
      >
    >


  export type MemberLoanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    amount?: boolean
    interestRate?: boolean
    status?: boolean
    issuedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    transactions?: boolean | MemberLoan$transactionsArgs<ExtArgs>
    _count?: boolean | MemberLoanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memberLoan"]>

  export type MemberLoanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    amount?: boolean
    interestRate?: boolean
    status?: boolean
    issuedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memberLoan"]>

  export type MemberLoanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    amount?: boolean
    interestRate?: boolean
    status?: boolean
    issuedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memberLoan"]>

  export type MemberLoanSelectScalar = {
    id?: boolean
    memberId?: boolean
    amount?: boolean
    interestRate?: boolean
    status?: boolean
    issuedAt?: boolean
  }

  export type MemberLoanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "memberId" | "amount" | "interestRate" | "status" | "issuedAt", ExtArgs["result"]["memberLoan"]>
  export type MemberLoanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    transactions?: boolean | MemberLoan$transactionsArgs<ExtArgs>
    _count?: boolean | MemberLoanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MemberLoanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }
  export type MemberLoanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }

  export type $MemberLoanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MemberLoan"
    objects: {
      member: Prisma.$MemberPayload<ExtArgs>
      transactions: Prisma.$MemberTransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      memberId: string
      amount: number
      interestRate: number
      status: $Enums.LoanStatus
      issuedAt: Date
    }, ExtArgs["result"]["memberLoan"]>
    composites: {}
  }

  type MemberLoanGetPayload<S extends boolean | null | undefined | MemberLoanDefaultArgs> = $Result.GetResult<Prisma.$MemberLoanPayload, S>

  type MemberLoanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemberLoanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemberLoanCountAggregateInputType | true
    }

  export interface MemberLoanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MemberLoan'], meta: { name: 'MemberLoan' } }
    /**
     * Find zero or one MemberLoan that matches the filter.
     * @param {MemberLoanFindUniqueArgs} args - Arguments to find a MemberLoan
     * @example
     * // Get one MemberLoan
     * const memberLoan = await prisma.memberLoan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemberLoanFindUniqueArgs>(args: SelectSubset<T, MemberLoanFindUniqueArgs<ExtArgs>>): Prisma__MemberLoanClient<$Result.GetResult<Prisma.$MemberLoanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MemberLoan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemberLoanFindUniqueOrThrowArgs} args - Arguments to find a MemberLoan
     * @example
     * // Get one MemberLoan
     * const memberLoan = await prisma.memberLoan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemberLoanFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberLoanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberLoanClient<$Result.GetResult<Prisma.$MemberLoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemberLoan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberLoanFindFirstArgs} args - Arguments to find a MemberLoan
     * @example
     * // Get one MemberLoan
     * const memberLoan = await prisma.memberLoan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemberLoanFindFirstArgs>(args?: SelectSubset<T, MemberLoanFindFirstArgs<ExtArgs>>): Prisma__MemberLoanClient<$Result.GetResult<Prisma.$MemberLoanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemberLoan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberLoanFindFirstOrThrowArgs} args - Arguments to find a MemberLoan
     * @example
     * // Get one MemberLoan
     * const memberLoan = await prisma.memberLoan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemberLoanFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberLoanFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberLoanClient<$Result.GetResult<Prisma.$MemberLoanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MemberLoans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberLoanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MemberLoans
     * const memberLoans = await prisma.memberLoan.findMany()
     * 
     * // Get first 10 MemberLoans
     * const memberLoans = await prisma.memberLoan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberLoanWithIdOnly = await prisma.memberLoan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemberLoanFindManyArgs>(args?: SelectSubset<T, MemberLoanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberLoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MemberLoan.
     * @param {MemberLoanCreateArgs} args - Arguments to create a MemberLoan.
     * @example
     * // Create one MemberLoan
     * const MemberLoan = await prisma.memberLoan.create({
     *   data: {
     *     // ... data to create a MemberLoan
     *   }
     * })
     * 
     */
    create<T extends MemberLoanCreateArgs>(args: SelectSubset<T, MemberLoanCreateArgs<ExtArgs>>): Prisma__MemberLoanClient<$Result.GetResult<Prisma.$MemberLoanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MemberLoans.
     * @param {MemberLoanCreateManyArgs} args - Arguments to create many MemberLoans.
     * @example
     * // Create many MemberLoans
     * const memberLoan = await prisma.memberLoan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemberLoanCreateManyArgs>(args?: SelectSubset<T, MemberLoanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MemberLoans and returns the data saved in the database.
     * @param {MemberLoanCreateManyAndReturnArgs} args - Arguments to create many MemberLoans.
     * @example
     * // Create many MemberLoans
     * const memberLoan = await prisma.memberLoan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MemberLoans and only return the `id`
     * const memberLoanWithIdOnly = await prisma.memberLoan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemberLoanCreateManyAndReturnArgs>(args?: SelectSubset<T, MemberLoanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberLoanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MemberLoan.
     * @param {MemberLoanDeleteArgs} args - Arguments to delete one MemberLoan.
     * @example
     * // Delete one MemberLoan
     * const MemberLoan = await prisma.memberLoan.delete({
     *   where: {
     *     // ... filter to delete one MemberLoan
     *   }
     * })
     * 
     */
    delete<T extends MemberLoanDeleteArgs>(args: SelectSubset<T, MemberLoanDeleteArgs<ExtArgs>>): Prisma__MemberLoanClient<$Result.GetResult<Prisma.$MemberLoanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MemberLoan.
     * @param {MemberLoanUpdateArgs} args - Arguments to update one MemberLoan.
     * @example
     * // Update one MemberLoan
     * const memberLoan = await prisma.memberLoan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemberLoanUpdateArgs>(args: SelectSubset<T, MemberLoanUpdateArgs<ExtArgs>>): Prisma__MemberLoanClient<$Result.GetResult<Prisma.$MemberLoanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MemberLoans.
     * @param {MemberLoanDeleteManyArgs} args - Arguments to filter MemberLoans to delete.
     * @example
     * // Delete a few MemberLoans
     * const { count } = await prisma.memberLoan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemberLoanDeleteManyArgs>(args?: SelectSubset<T, MemberLoanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemberLoans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberLoanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MemberLoans
     * const memberLoan = await prisma.memberLoan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemberLoanUpdateManyArgs>(args: SelectSubset<T, MemberLoanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemberLoans and returns the data updated in the database.
     * @param {MemberLoanUpdateManyAndReturnArgs} args - Arguments to update many MemberLoans.
     * @example
     * // Update many MemberLoans
     * const memberLoan = await prisma.memberLoan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MemberLoans and only return the `id`
     * const memberLoanWithIdOnly = await prisma.memberLoan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MemberLoanUpdateManyAndReturnArgs>(args: SelectSubset<T, MemberLoanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberLoanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MemberLoan.
     * @param {MemberLoanUpsertArgs} args - Arguments to update or create a MemberLoan.
     * @example
     * // Update or create a MemberLoan
     * const memberLoan = await prisma.memberLoan.upsert({
     *   create: {
     *     // ... data to create a MemberLoan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MemberLoan we want to update
     *   }
     * })
     */
    upsert<T extends MemberLoanUpsertArgs>(args: SelectSubset<T, MemberLoanUpsertArgs<ExtArgs>>): Prisma__MemberLoanClient<$Result.GetResult<Prisma.$MemberLoanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MemberLoans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberLoanCountArgs} args - Arguments to filter MemberLoans to count.
     * @example
     * // Count the number of MemberLoans
     * const count = await prisma.memberLoan.count({
     *   where: {
     *     // ... the filter for the MemberLoans we want to count
     *   }
     * })
    **/
    count<T extends MemberLoanCountArgs>(
      args?: Subset<T, MemberLoanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberLoanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MemberLoan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberLoanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemberLoanAggregateArgs>(args: Subset<T, MemberLoanAggregateArgs>): Prisma.PrismaPromise<GetMemberLoanAggregateType<T>>

    /**
     * Group by MemberLoan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberLoanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemberLoanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberLoanGroupByArgs['orderBy'] }
        : { orderBy?: MemberLoanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemberLoanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberLoanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MemberLoan model
   */
  readonly fields: MemberLoanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MemberLoan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberLoanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    member<T extends MemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberDefaultArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transactions<T extends MemberLoan$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, MemberLoan$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MemberLoan model
   */
  interface MemberLoanFieldRefs {
    readonly id: FieldRef<"MemberLoan", 'String'>
    readonly memberId: FieldRef<"MemberLoan", 'String'>
    readonly amount: FieldRef<"MemberLoan", 'Float'>
    readonly interestRate: FieldRef<"MemberLoan", 'Float'>
    readonly status: FieldRef<"MemberLoan", 'LoanStatus'>
    readonly issuedAt: FieldRef<"MemberLoan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MemberLoan findUnique
   */
  export type MemberLoanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberLoan
     */
    select?: MemberLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberLoan
     */
    omit?: MemberLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberLoanInclude<ExtArgs> | null
    /**
     * Filter, which MemberLoan to fetch.
     */
    where: MemberLoanWhereUniqueInput
  }

  /**
   * MemberLoan findUniqueOrThrow
   */
  export type MemberLoanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberLoan
     */
    select?: MemberLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberLoan
     */
    omit?: MemberLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberLoanInclude<ExtArgs> | null
    /**
     * Filter, which MemberLoan to fetch.
     */
    where: MemberLoanWhereUniqueInput
  }

  /**
   * MemberLoan findFirst
   */
  export type MemberLoanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberLoan
     */
    select?: MemberLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberLoan
     */
    omit?: MemberLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberLoanInclude<ExtArgs> | null
    /**
     * Filter, which MemberLoan to fetch.
     */
    where?: MemberLoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberLoans to fetch.
     */
    orderBy?: MemberLoanOrderByWithRelationInput | MemberLoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemberLoans.
     */
    cursor?: MemberLoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberLoans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberLoans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberLoans.
     */
    distinct?: MemberLoanScalarFieldEnum | MemberLoanScalarFieldEnum[]
  }

  /**
   * MemberLoan findFirstOrThrow
   */
  export type MemberLoanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberLoan
     */
    select?: MemberLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberLoan
     */
    omit?: MemberLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberLoanInclude<ExtArgs> | null
    /**
     * Filter, which MemberLoan to fetch.
     */
    where?: MemberLoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberLoans to fetch.
     */
    orderBy?: MemberLoanOrderByWithRelationInput | MemberLoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemberLoans.
     */
    cursor?: MemberLoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberLoans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberLoans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberLoans.
     */
    distinct?: MemberLoanScalarFieldEnum | MemberLoanScalarFieldEnum[]
  }

  /**
   * MemberLoan findMany
   */
  export type MemberLoanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberLoan
     */
    select?: MemberLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberLoan
     */
    omit?: MemberLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberLoanInclude<ExtArgs> | null
    /**
     * Filter, which MemberLoans to fetch.
     */
    where?: MemberLoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberLoans to fetch.
     */
    orderBy?: MemberLoanOrderByWithRelationInput | MemberLoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MemberLoans.
     */
    cursor?: MemberLoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberLoans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberLoans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberLoans.
     */
    distinct?: MemberLoanScalarFieldEnum | MemberLoanScalarFieldEnum[]
  }

  /**
   * MemberLoan create
   */
  export type MemberLoanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberLoan
     */
    select?: MemberLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberLoan
     */
    omit?: MemberLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberLoanInclude<ExtArgs> | null
    /**
     * The data needed to create a MemberLoan.
     */
    data: XOR<MemberLoanCreateInput, MemberLoanUncheckedCreateInput>
  }

  /**
   * MemberLoan createMany
   */
  export type MemberLoanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MemberLoans.
     */
    data: MemberLoanCreateManyInput | MemberLoanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MemberLoan createManyAndReturn
   */
  export type MemberLoanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberLoan
     */
    select?: MemberLoanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemberLoan
     */
    omit?: MemberLoanOmit<ExtArgs> | null
    /**
     * The data used to create many MemberLoans.
     */
    data: MemberLoanCreateManyInput | MemberLoanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberLoanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemberLoan update
   */
  export type MemberLoanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberLoan
     */
    select?: MemberLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberLoan
     */
    omit?: MemberLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberLoanInclude<ExtArgs> | null
    /**
     * The data needed to update a MemberLoan.
     */
    data: XOR<MemberLoanUpdateInput, MemberLoanUncheckedUpdateInput>
    /**
     * Choose, which MemberLoan to update.
     */
    where: MemberLoanWhereUniqueInput
  }

  /**
   * MemberLoan updateMany
   */
  export type MemberLoanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MemberLoans.
     */
    data: XOR<MemberLoanUpdateManyMutationInput, MemberLoanUncheckedUpdateManyInput>
    /**
     * Filter which MemberLoans to update
     */
    where?: MemberLoanWhereInput
    /**
     * Limit how many MemberLoans to update.
     */
    limit?: number
  }

  /**
   * MemberLoan updateManyAndReturn
   */
  export type MemberLoanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberLoan
     */
    select?: MemberLoanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemberLoan
     */
    omit?: MemberLoanOmit<ExtArgs> | null
    /**
     * The data used to update MemberLoans.
     */
    data: XOR<MemberLoanUpdateManyMutationInput, MemberLoanUncheckedUpdateManyInput>
    /**
     * Filter which MemberLoans to update
     */
    where?: MemberLoanWhereInput
    /**
     * Limit how many MemberLoans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberLoanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemberLoan upsert
   */
  export type MemberLoanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberLoan
     */
    select?: MemberLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberLoan
     */
    omit?: MemberLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberLoanInclude<ExtArgs> | null
    /**
     * The filter to search for the MemberLoan to update in case it exists.
     */
    where: MemberLoanWhereUniqueInput
    /**
     * In case the MemberLoan found by the `where` argument doesn't exist, create a new MemberLoan with this data.
     */
    create: XOR<MemberLoanCreateInput, MemberLoanUncheckedCreateInput>
    /**
     * In case the MemberLoan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberLoanUpdateInput, MemberLoanUncheckedUpdateInput>
  }

  /**
   * MemberLoan delete
   */
  export type MemberLoanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberLoan
     */
    select?: MemberLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberLoan
     */
    omit?: MemberLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberLoanInclude<ExtArgs> | null
    /**
     * Filter which MemberLoan to delete.
     */
    where: MemberLoanWhereUniqueInput
  }

  /**
   * MemberLoan deleteMany
   */
  export type MemberLoanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemberLoans to delete
     */
    where?: MemberLoanWhereInput
    /**
     * Limit how many MemberLoans to delete.
     */
    limit?: number
  }

  /**
   * MemberLoan.transactions
   */
  export type MemberLoan$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberTransaction
     */
    select?: MemberTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberTransaction
     */
    omit?: MemberTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberTransactionInclude<ExtArgs> | null
    where?: MemberTransactionWhereInput
    orderBy?: MemberTransactionOrderByWithRelationInput | MemberTransactionOrderByWithRelationInput[]
    cursor?: MemberTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberTransactionScalarFieldEnum | MemberTransactionScalarFieldEnum[]
  }

  /**
   * MemberLoan without action
   */
  export type MemberLoanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberLoan
     */
    select?: MemberLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberLoan
     */
    omit?: MemberLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberLoanInclude<ExtArgs> | null
  }


  /**
   * Model MemberTransaction
   */

  export type AggregateMemberTransaction = {
    _count: MemberTransactionCountAggregateOutputType | null
    _avg: MemberTransactionAvgAggregateOutputType | null
    _sum: MemberTransactionSumAggregateOutputType | null
    _min: MemberTransactionMinAggregateOutputType | null
    _max: MemberTransactionMaxAggregateOutputType | null
  }

  export type MemberTransactionAvgAggregateOutputType = {
    amount: number | null
  }

  export type MemberTransactionSumAggregateOutputType = {
    amount: number | null
  }

  export type MemberTransactionMinAggregateOutputType = {
    id: string | null
    memberId: string | null
    loanId: string | null
    amount: number | null
    type: $Enums.TransactionType | null
    date: Date | null
    description: string | null
  }

  export type MemberTransactionMaxAggregateOutputType = {
    id: string | null
    memberId: string | null
    loanId: string | null
    amount: number | null
    type: $Enums.TransactionType | null
    date: Date | null
    description: string | null
  }

  export type MemberTransactionCountAggregateOutputType = {
    id: number
    memberId: number
    loanId: number
    amount: number
    type: number
    date: number
    description: number
    _all: number
  }


  export type MemberTransactionAvgAggregateInputType = {
    amount?: true
  }

  export type MemberTransactionSumAggregateInputType = {
    amount?: true
  }

  export type MemberTransactionMinAggregateInputType = {
    id?: true
    memberId?: true
    loanId?: true
    amount?: true
    type?: true
    date?: true
    description?: true
  }

  export type MemberTransactionMaxAggregateInputType = {
    id?: true
    memberId?: true
    loanId?: true
    amount?: true
    type?: true
    date?: true
    description?: true
  }

  export type MemberTransactionCountAggregateInputType = {
    id?: true
    memberId?: true
    loanId?: true
    amount?: true
    type?: true
    date?: true
    description?: true
    _all?: true
  }

  export type MemberTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemberTransaction to aggregate.
     */
    where?: MemberTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberTransactions to fetch.
     */
    orderBy?: MemberTransactionOrderByWithRelationInput | MemberTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MemberTransactions
    **/
    _count?: true | MemberTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MemberTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MemberTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberTransactionMaxAggregateInputType
  }

  export type GetMemberTransactionAggregateType<T extends MemberTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateMemberTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemberTransaction[P]>
      : GetScalarType<T[P], AggregateMemberTransaction[P]>
  }




  export type MemberTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberTransactionWhereInput
    orderBy?: MemberTransactionOrderByWithAggregationInput | MemberTransactionOrderByWithAggregationInput[]
    by: MemberTransactionScalarFieldEnum[] | MemberTransactionScalarFieldEnum
    having?: MemberTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberTransactionCountAggregateInputType | true
    _avg?: MemberTransactionAvgAggregateInputType
    _sum?: MemberTransactionSumAggregateInputType
    _min?: MemberTransactionMinAggregateInputType
    _max?: MemberTransactionMaxAggregateInputType
  }

  export type MemberTransactionGroupByOutputType = {
    id: string
    memberId: string
    loanId: string | null
    amount: number
    type: $Enums.TransactionType
    date: Date
    description: string | null
    _count: MemberTransactionCountAggregateOutputType | null
    _avg: MemberTransactionAvgAggregateOutputType | null
    _sum: MemberTransactionSumAggregateOutputType | null
    _min: MemberTransactionMinAggregateOutputType | null
    _max: MemberTransactionMaxAggregateOutputType | null
  }

  type GetMemberTransactionGroupByPayload<T extends MemberTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], MemberTransactionGroupByOutputType[P]>
        }
      >
    >


  export type MemberTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    loanId?: boolean
    amount?: boolean
    type?: boolean
    date?: boolean
    description?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    loan?: boolean | MemberTransaction$loanArgs<ExtArgs>
  }, ExtArgs["result"]["memberTransaction"]>

  export type MemberTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    loanId?: boolean
    amount?: boolean
    type?: boolean
    date?: boolean
    description?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    loan?: boolean | MemberTransaction$loanArgs<ExtArgs>
  }, ExtArgs["result"]["memberTransaction"]>

  export type MemberTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    loanId?: boolean
    amount?: boolean
    type?: boolean
    date?: boolean
    description?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    loan?: boolean | MemberTransaction$loanArgs<ExtArgs>
  }, ExtArgs["result"]["memberTransaction"]>

  export type MemberTransactionSelectScalar = {
    id?: boolean
    memberId?: boolean
    loanId?: boolean
    amount?: boolean
    type?: boolean
    date?: boolean
    description?: boolean
  }

  export type MemberTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "memberId" | "loanId" | "amount" | "type" | "date" | "description", ExtArgs["result"]["memberTransaction"]>
  export type MemberTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    loan?: boolean | MemberTransaction$loanArgs<ExtArgs>
  }
  export type MemberTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    loan?: boolean | MemberTransaction$loanArgs<ExtArgs>
  }
  export type MemberTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    loan?: boolean | MemberTransaction$loanArgs<ExtArgs>
  }

  export type $MemberTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MemberTransaction"
    objects: {
      member: Prisma.$MemberPayload<ExtArgs>
      loan: Prisma.$MemberLoanPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      memberId: string
      loanId: string | null
      amount: number
      type: $Enums.TransactionType
      date: Date
      description: string | null
    }, ExtArgs["result"]["memberTransaction"]>
    composites: {}
  }

  type MemberTransactionGetPayload<S extends boolean | null | undefined | MemberTransactionDefaultArgs> = $Result.GetResult<Prisma.$MemberTransactionPayload, S>

  type MemberTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemberTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemberTransactionCountAggregateInputType | true
    }

  export interface MemberTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MemberTransaction'], meta: { name: 'MemberTransaction' } }
    /**
     * Find zero or one MemberTransaction that matches the filter.
     * @param {MemberTransactionFindUniqueArgs} args - Arguments to find a MemberTransaction
     * @example
     * // Get one MemberTransaction
     * const memberTransaction = await prisma.memberTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemberTransactionFindUniqueArgs>(args: SelectSubset<T, MemberTransactionFindUniqueArgs<ExtArgs>>): Prisma__MemberTransactionClient<$Result.GetResult<Prisma.$MemberTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MemberTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemberTransactionFindUniqueOrThrowArgs} args - Arguments to find a MemberTransaction
     * @example
     * // Get one MemberTransaction
     * const memberTransaction = await prisma.memberTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemberTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberTransactionClient<$Result.GetResult<Prisma.$MemberTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemberTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberTransactionFindFirstArgs} args - Arguments to find a MemberTransaction
     * @example
     * // Get one MemberTransaction
     * const memberTransaction = await prisma.memberTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemberTransactionFindFirstArgs>(args?: SelectSubset<T, MemberTransactionFindFirstArgs<ExtArgs>>): Prisma__MemberTransactionClient<$Result.GetResult<Prisma.$MemberTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemberTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberTransactionFindFirstOrThrowArgs} args - Arguments to find a MemberTransaction
     * @example
     * // Get one MemberTransaction
     * const memberTransaction = await prisma.memberTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemberTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberTransactionClient<$Result.GetResult<Prisma.$MemberTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MemberTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MemberTransactions
     * const memberTransactions = await prisma.memberTransaction.findMany()
     * 
     * // Get first 10 MemberTransactions
     * const memberTransactions = await prisma.memberTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberTransactionWithIdOnly = await prisma.memberTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemberTransactionFindManyArgs>(args?: SelectSubset<T, MemberTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MemberTransaction.
     * @param {MemberTransactionCreateArgs} args - Arguments to create a MemberTransaction.
     * @example
     * // Create one MemberTransaction
     * const MemberTransaction = await prisma.memberTransaction.create({
     *   data: {
     *     // ... data to create a MemberTransaction
     *   }
     * })
     * 
     */
    create<T extends MemberTransactionCreateArgs>(args: SelectSubset<T, MemberTransactionCreateArgs<ExtArgs>>): Prisma__MemberTransactionClient<$Result.GetResult<Prisma.$MemberTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MemberTransactions.
     * @param {MemberTransactionCreateManyArgs} args - Arguments to create many MemberTransactions.
     * @example
     * // Create many MemberTransactions
     * const memberTransaction = await prisma.memberTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemberTransactionCreateManyArgs>(args?: SelectSubset<T, MemberTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MemberTransactions and returns the data saved in the database.
     * @param {MemberTransactionCreateManyAndReturnArgs} args - Arguments to create many MemberTransactions.
     * @example
     * // Create many MemberTransactions
     * const memberTransaction = await prisma.memberTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MemberTransactions and only return the `id`
     * const memberTransactionWithIdOnly = await prisma.memberTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemberTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, MemberTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MemberTransaction.
     * @param {MemberTransactionDeleteArgs} args - Arguments to delete one MemberTransaction.
     * @example
     * // Delete one MemberTransaction
     * const MemberTransaction = await prisma.memberTransaction.delete({
     *   where: {
     *     // ... filter to delete one MemberTransaction
     *   }
     * })
     * 
     */
    delete<T extends MemberTransactionDeleteArgs>(args: SelectSubset<T, MemberTransactionDeleteArgs<ExtArgs>>): Prisma__MemberTransactionClient<$Result.GetResult<Prisma.$MemberTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MemberTransaction.
     * @param {MemberTransactionUpdateArgs} args - Arguments to update one MemberTransaction.
     * @example
     * // Update one MemberTransaction
     * const memberTransaction = await prisma.memberTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemberTransactionUpdateArgs>(args: SelectSubset<T, MemberTransactionUpdateArgs<ExtArgs>>): Prisma__MemberTransactionClient<$Result.GetResult<Prisma.$MemberTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MemberTransactions.
     * @param {MemberTransactionDeleteManyArgs} args - Arguments to filter MemberTransactions to delete.
     * @example
     * // Delete a few MemberTransactions
     * const { count } = await prisma.memberTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemberTransactionDeleteManyArgs>(args?: SelectSubset<T, MemberTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemberTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MemberTransactions
     * const memberTransaction = await prisma.memberTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemberTransactionUpdateManyArgs>(args: SelectSubset<T, MemberTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemberTransactions and returns the data updated in the database.
     * @param {MemberTransactionUpdateManyAndReturnArgs} args - Arguments to update many MemberTransactions.
     * @example
     * // Update many MemberTransactions
     * const memberTransaction = await prisma.memberTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MemberTransactions and only return the `id`
     * const memberTransactionWithIdOnly = await prisma.memberTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MemberTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, MemberTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MemberTransaction.
     * @param {MemberTransactionUpsertArgs} args - Arguments to update or create a MemberTransaction.
     * @example
     * // Update or create a MemberTransaction
     * const memberTransaction = await prisma.memberTransaction.upsert({
     *   create: {
     *     // ... data to create a MemberTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MemberTransaction we want to update
     *   }
     * })
     */
    upsert<T extends MemberTransactionUpsertArgs>(args: SelectSubset<T, MemberTransactionUpsertArgs<ExtArgs>>): Prisma__MemberTransactionClient<$Result.GetResult<Prisma.$MemberTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MemberTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberTransactionCountArgs} args - Arguments to filter MemberTransactions to count.
     * @example
     * // Count the number of MemberTransactions
     * const count = await prisma.memberTransaction.count({
     *   where: {
     *     // ... the filter for the MemberTransactions we want to count
     *   }
     * })
    **/
    count<T extends MemberTransactionCountArgs>(
      args?: Subset<T, MemberTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MemberTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemberTransactionAggregateArgs>(args: Subset<T, MemberTransactionAggregateArgs>): Prisma.PrismaPromise<GetMemberTransactionAggregateType<T>>

    /**
     * Group by MemberTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemberTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberTransactionGroupByArgs['orderBy'] }
        : { orderBy?: MemberTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemberTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MemberTransaction model
   */
  readonly fields: MemberTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MemberTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    member<T extends MemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberDefaultArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    loan<T extends MemberTransaction$loanArgs<ExtArgs> = {}>(args?: Subset<T, MemberTransaction$loanArgs<ExtArgs>>): Prisma__MemberLoanClient<$Result.GetResult<Prisma.$MemberLoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MemberTransaction model
   */
  interface MemberTransactionFieldRefs {
    readonly id: FieldRef<"MemberTransaction", 'String'>
    readonly memberId: FieldRef<"MemberTransaction", 'String'>
    readonly loanId: FieldRef<"MemberTransaction", 'String'>
    readonly amount: FieldRef<"MemberTransaction", 'Float'>
    readonly type: FieldRef<"MemberTransaction", 'TransactionType'>
    readonly date: FieldRef<"MemberTransaction", 'DateTime'>
    readonly description: FieldRef<"MemberTransaction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MemberTransaction findUnique
   */
  export type MemberTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberTransaction
     */
    select?: MemberTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberTransaction
     */
    omit?: MemberTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberTransactionInclude<ExtArgs> | null
    /**
     * Filter, which MemberTransaction to fetch.
     */
    where: MemberTransactionWhereUniqueInput
  }

  /**
   * MemberTransaction findUniqueOrThrow
   */
  export type MemberTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberTransaction
     */
    select?: MemberTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberTransaction
     */
    omit?: MemberTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberTransactionInclude<ExtArgs> | null
    /**
     * Filter, which MemberTransaction to fetch.
     */
    where: MemberTransactionWhereUniqueInput
  }

  /**
   * MemberTransaction findFirst
   */
  export type MemberTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberTransaction
     */
    select?: MemberTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberTransaction
     */
    omit?: MemberTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberTransactionInclude<ExtArgs> | null
    /**
     * Filter, which MemberTransaction to fetch.
     */
    where?: MemberTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberTransactions to fetch.
     */
    orderBy?: MemberTransactionOrderByWithRelationInput | MemberTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemberTransactions.
     */
    cursor?: MemberTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberTransactions.
     */
    distinct?: MemberTransactionScalarFieldEnum | MemberTransactionScalarFieldEnum[]
  }

  /**
   * MemberTransaction findFirstOrThrow
   */
  export type MemberTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberTransaction
     */
    select?: MemberTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberTransaction
     */
    omit?: MemberTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberTransactionInclude<ExtArgs> | null
    /**
     * Filter, which MemberTransaction to fetch.
     */
    where?: MemberTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberTransactions to fetch.
     */
    orderBy?: MemberTransactionOrderByWithRelationInput | MemberTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemberTransactions.
     */
    cursor?: MemberTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberTransactions.
     */
    distinct?: MemberTransactionScalarFieldEnum | MemberTransactionScalarFieldEnum[]
  }

  /**
   * MemberTransaction findMany
   */
  export type MemberTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberTransaction
     */
    select?: MemberTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberTransaction
     */
    omit?: MemberTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberTransactionInclude<ExtArgs> | null
    /**
     * Filter, which MemberTransactions to fetch.
     */
    where?: MemberTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberTransactions to fetch.
     */
    orderBy?: MemberTransactionOrderByWithRelationInput | MemberTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MemberTransactions.
     */
    cursor?: MemberTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberTransactions.
     */
    distinct?: MemberTransactionScalarFieldEnum | MemberTransactionScalarFieldEnum[]
  }

  /**
   * MemberTransaction create
   */
  export type MemberTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberTransaction
     */
    select?: MemberTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberTransaction
     */
    omit?: MemberTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a MemberTransaction.
     */
    data: XOR<MemberTransactionCreateInput, MemberTransactionUncheckedCreateInput>
  }

  /**
   * MemberTransaction createMany
   */
  export type MemberTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MemberTransactions.
     */
    data: MemberTransactionCreateManyInput | MemberTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MemberTransaction createManyAndReturn
   */
  export type MemberTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberTransaction
     */
    select?: MemberTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemberTransaction
     */
    omit?: MemberTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many MemberTransactions.
     */
    data: MemberTransactionCreateManyInput | MemberTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemberTransaction update
   */
  export type MemberTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberTransaction
     */
    select?: MemberTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberTransaction
     */
    omit?: MemberTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a MemberTransaction.
     */
    data: XOR<MemberTransactionUpdateInput, MemberTransactionUncheckedUpdateInput>
    /**
     * Choose, which MemberTransaction to update.
     */
    where: MemberTransactionWhereUniqueInput
  }

  /**
   * MemberTransaction updateMany
   */
  export type MemberTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MemberTransactions.
     */
    data: XOR<MemberTransactionUpdateManyMutationInput, MemberTransactionUncheckedUpdateManyInput>
    /**
     * Filter which MemberTransactions to update
     */
    where?: MemberTransactionWhereInput
    /**
     * Limit how many MemberTransactions to update.
     */
    limit?: number
  }

  /**
   * MemberTransaction updateManyAndReturn
   */
  export type MemberTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberTransaction
     */
    select?: MemberTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemberTransaction
     */
    omit?: MemberTransactionOmit<ExtArgs> | null
    /**
     * The data used to update MemberTransactions.
     */
    data: XOR<MemberTransactionUpdateManyMutationInput, MemberTransactionUncheckedUpdateManyInput>
    /**
     * Filter which MemberTransactions to update
     */
    where?: MemberTransactionWhereInput
    /**
     * Limit how many MemberTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemberTransaction upsert
   */
  export type MemberTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberTransaction
     */
    select?: MemberTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberTransaction
     */
    omit?: MemberTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the MemberTransaction to update in case it exists.
     */
    where: MemberTransactionWhereUniqueInput
    /**
     * In case the MemberTransaction found by the `where` argument doesn't exist, create a new MemberTransaction with this data.
     */
    create: XOR<MemberTransactionCreateInput, MemberTransactionUncheckedCreateInput>
    /**
     * In case the MemberTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberTransactionUpdateInput, MemberTransactionUncheckedUpdateInput>
  }

  /**
   * MemberTransaction delete
   */
  export type MemberTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberTransaction
     */
    select?: MemberTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberTransaction
     */
    omit?: MemberTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberTransactionInclude<ExtArgs> | null
    /**
     * Filter which MemberTransaction to delete.
     */
    where: MemberTransactionWhereUniqueInput
  }

  /**
   * MemberTransaction deleteMany
   */
  export type MemberTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemberTransactions to delete
     */
    where?: MemberTransactionWhereInput
    /**
     * Limit how many MemberTransactions to delete.
     */
    limit?: number
  }

  /**
   * MemberTransaction.loan
   */
  export type MemberTransaction$loanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberLoan
     */
    select?: MemberLoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberLoan
     */
    omit?: MemberLoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberLoanInclude<ExtArgs> | null
    where?: MemberLoanWhereInput
  }

  /**
   * MemberTransaction without action
   */
  export type MemberTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberTransaction
     */
    select?: MemberTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberTransaction
     */
    omit?: MemberTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberTransactionInclude<ExtArgs> | null
  }


  /**
   * Model MonthlyReport
   */

  export type AggregateMonthlyReport = {
    _count: MonthlyReportCountAggregateOutputType | null
    _avg: MonthlyReportAvgAggregateOutputType | null
    _sum: MonthlyReportSumAggregateOutputType | null
    _min: MonthlyReportMinAggregateOutputType | null
    _max: MonthlyReportMaxAggregateOutputType | null
  }

  export type MonthlyReportAvgAggregateOutputType = {
    interestCollected: number | null
    loansDisbursed: number | null
    principalRecovered: number | null
    totalInterest: number | null
    totalMembersFund: number | null
    totalDistributed: number | null
    cashInHand: number | null
    totalGroupValue: number | null
  }

  export type MonthlyReportSumAggregateOutputType = {
    interestCollected: number | null
    loansDisbursed: number | null
    principalRecovered: number | null
    totalInterest: number | null
    totalMembersFund: number | null
    totalDistributed: number | null
    cashInHand: number | null
    totalGroupValue: number | null
  }

  export type MonthlyReportMinAggregateOutputType = {
    id: string | null
    reportDate: Date | null
    interestCollected: number | null
    loansDisbursed: number | null
    principalRecovered: number | null
    totalInterest: number | null
    totalMembersFund: number | null
    totalDistributed: number | null
    cashInHand: number | null
    totalGroupValue: number | null
  }

  export type MonthlyReportMaxAggregateOutputType = {
    id: string | null
    reportDate: Date | null
    interestCollected: number | null
    loansDisbursed: number | null
    principalRecovered: number | null
    totalInterest: number | null
    totalMembersFund: number | null
    totalDistributed: number | null
    cashInHand: number | null
    totalGroupValue: number | null
  }

  export type MonthlyReportCountAggregateOutputType = {
    id: number
    reportDate: number
    interestCollected: number
    loansDisbursed: number
    principalRecovered: number
    totalInterest: number
    totalMembersFund: number
    totalDistributed: number
    cashInHand: number
    totalGroupValue: number
    _all: number
  }


  export type MonthlyReportAvgAggregateInputType = {
    interestCollected?: true
    loansDisbursed?: true
    principalRecovered?: true
    totalInterest?: true
    totalMembersFund?: true
    totalDistributed?: true
    cashInHand?: true
    totalGroupValue?: true
  }

  export type MonthlyReportSumAggregateInputType = {
    interestCollected?: true
    loansDisbursed?: true
    principalRecovered?: true
    totalInterest?: true
    totalMembersFund?: true
    totalDistributed?: true
    cashInHand?: true
    totalGroupValue?: true
  }

  export type MonthlyReportMinAggregateInputType = {
    id?: true
    reportDate?: true
    interestCollected?: true
    loansDisbursed?: true
    principalRecovered?: true
    totalInterest?: true
    totalMembersFund?: true
    totalDistributed?: true
    cashInHand?: true
    totalGroupValue?: true
  }

  export type MonthlyReportMaxAggregateInputType = {
    id?: true
    reportDate?: true
    interestCollected?: true
    loansDisbursed?: true
    principalRecovered?: true
    totalInterest?: true
    totalMembersFund?: true
    totalDistributed?: true
    cashInHand?: true
    totalGroupValue?: true
  }

  export type MonthlyReportCountAggregateInputType = {
    id?: true
    reportDate?: true
    interestCollected?: true
    loansDisbursed?: true
    principalRecovered?: true
    totalInterest?: true
    totalMembersFund?: true
    totalDistributed?: true
    cashInHand?: true
    totalGroupValue?: true
    _all?: true
  }

  export type MonthlyReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyReport to aggregate.
     */
    where?: MonthlyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyReports to fetch.
     */
    orderBy?: MonthlyReportOrderByWithRelationInput | MonthlyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MonthlyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MonthlyReports
    **/
    _count?: true | MonthlyReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MonthlyReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MonthlyReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MonthlyReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MonthlyReportMaxAggregateInputType
  }

  export type GetMonthlyReportAggregateType<T extends MonthlyReportAggregateArgs> = {
        [P in keyof T & keyof AggregateMonthlyReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMonthlyReport[P]>
      : GetScalarType<T[P], AggregateMonthlyReport[P]>
  }




  export type MonthlyReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyReportWhereInput
    orderBy?: MonthlyReportOrderByWithAggregationInput | MonthlyReportOrderByWithAggregationInput[]
    by: MonthlyReportScalarFieldEnum[] | MonthlyReportScalarFieldEnum
    having?: MonthlyReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MonthlyReportCountAggregateInputType | true
    _avg?: MonthlyReportAvgAggregateInputType
    _sum?: MonthlyReportSumAggregateInputType
    _min?: MonthlyReportMinAggregateInputType
    _max?: MonthlyReportMaxAggregateInputType
  }

  export type MonthlyReportGroupByOutputType = {
    id: string
    reportDate: Date
    interestCollected: number
    loansDisbursed: number
    principalRecovered: number
    totalInterest: number
    totalMembersFund: number
    totalDistributed: number
    cashInHand: number
    totalGroupValue: number
    _count: MonthlyReportCountAggregateOutputType | null
    _avg: MonthlyReportAvgAggregateOutputType | null
    _sum: MonthlyReportSumAggregateOutputType | null
    _min: MonthlyReportMinAggregateOutputType | null
    _max: MonthlyReportMaxAggregateOutputType | null
  }

  type GetMonthlyReportGroupByPayload<T extends MonthlyReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MonthlyReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MonthlyReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MonthlyReportGroupByOutputType[P]>
            : GetScalarType<T[P], MonthlyReportGroupByOutputType[P]>
        }
      >
    >


  export type MonthlyReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportDate?: boolean
    interestCollected?: boolean
    loansDisbursed?: boolean
    principalRecovered?: boolean
    totalInterest?: boolean
    totalMembersFund?: boolean
    totalDistributed?: boolean
    cashInHand?: boolean
    totalGroupValue?: boolean
  }, ExtArgs["result"]["monthlyReport"]>

  export type MonthlyReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportDate?: boolean
    interestCollected?: boolean
    loansDisbursed?: boolean
    principalRecovered?: boolean
    totalInterest?: boolean
    totalMembersFund?: boolean
    totalDistributed?: boolean
    cashInHand?: boolean
    totalGroupValue?: boolean
  }, ExtArgs["result"]["monthlyReport"]>

  export type MonthlyReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportDate?: boolean
    interestCollected?: boolean
    loansDisbursed?: boolean
    principalRecovered?: boolean
    totalInterest?: boolean
    totalMembersFund?: boolean
    totalDistributed?: boolean
    cashInHand?: boolean
    totalGroupValue?: boolean
  }, ExtArgs["result"]["monthlyReport"]>

  export type MonthlyReportSelectScalar = {
    id?: boolean
    reportDate?: boolean
    interestCollected?: boolean
    loansDisbursed?: boolean
    principalRecovered?: boolean
    totalInterest?: boolean
    totalMembersFund?: boolean
    totalDistributed?: boolean
    cashInHand?: boolean
    totalGroupValue?: boolean
  }

  export type MonthlyReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reportDate" | "interestCollected" | "loansDisbursed" | "principalRecovered" | "totalInterest" | "totalMembersFund" | "totalDistributed" | "cashInHand" | "totalGroupValue", ExtArgs["result"]["monthlyReport"]>

  export type $MonthlyReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MonthlyReport"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reportDate: Date
      interestCollected: number
      loansDisbursed: number
      principalRecovered: number
      totalInterest: number
      totalMembersFund: number
      totalDistributed: number
      cashInHand: number
      totalGroupValue: number
    }, ExtArgs["result"]["monthlyReport"]>
    composites: {}
  }

  type MonthlyReportGetPayload<S extends boolean | null | undefined | MonthlyReportDefaultArgs> = $Result.GetResult<Prisma.$MonthlyReportPayload, S>

  type MonthlyReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MonthlyReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MonthlyReportCountAggregateInputType | true
    }

  export interface MonthlyReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MonthlyReport'], meta: { name: 'MonthlyReport' } }
    /**
     * Find zero or one MonthlyReport that matches the filter.
     * @param {MonthlyReportFindUniqueArgs} args - Arguments to find a MonthlyReport
     * @example
     * // Get one MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MonthlyReportFindUniqueArgs>(args: SelectSubset<T, MonthlyReportFindUniqueArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MonthlyReport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MonthlyReportFindUniqueOrThrowArgs} args - Arguments to find a MonthlyReport
     * @example
     * // Get one MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MonthlyReportFindUniqueOrThrowArgs>(args: SelectSubset<T, MonthlyReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlyReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportFindFirstArgs} args - Arguments to find a MonthlyReport
     * @example
     * // Get one MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MonthlyReportFindFirstArgs>(args?: SelectSubset<T, MonthlyReportFindFirstArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlyReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportFindFirstOrThrowArgs} args - Arguments to find a MonthlyReport
     * @example
     * // Get one MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MonthlyReportFindFirstOrThrowArgs>(args?: SelectSubset<T, MonthlyReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MonthlyReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MonthlyReports
     * const monthlyReports = await prisma.monthlyReport.findMany()
     * 
     * // Get first 10 MonthlyReports
     * const monthlyReports = await prisma.monthlyReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const monthlyReportWithIdOnly = await prisma.monthlyReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MonthlyReportFindManyArgs>(args?: SelectSubset<T, MonthlyReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MonthlyReport.
     * @param {MonthlyReportCreateArgs} args - Arguments to create a MonthlyReport.
     * @example
     * // Create one MonthlyReport
     * const MonthlyReport = await prisma.monthlyReport.create({
     *   data: {
     *     // ... data to create a MonthlyReport
     *   }
     * })
     * 
     */
    create<T extends MonthlyReportCreateArgs>(args: SelectSubset<T, MonthlyReportCreateArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MonthlyReports.
     * @param {MonthlyReportCreateManyArgs} args - Arguments to create many MonthlyReports.
     * @example
     * // Create many MonthlyReports
     * const monthlyReport = await prisma.monthlyReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MonthlyReportCreateManyArgs>(args?: SelectSubset<T, MonthlyReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MonthlyReports and returns the data saved in the database.
     * @param {MonthlyReportCreateManyAndReturnArgs} args - Arguments to create many MonthlyReports.
     * @example
     * // Create many MonthlyReports
     * const monthlyReport = await prisma.monthlyReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MonthlyReports and only return the `id`
     * const monthlyReportWithIdOnly = await prisma.monthlyReport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MonthlyReportCreateManyAndReturnArgs>(args?: SelectSubset<T, MonthlyReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MonthlyReport.
     * @param {MonthlyReportDeleteArgs} args - Arguments to delete one MonthlyReport.
     * @example
     * // Delete one MonthlyReport
     * const MonthlyReport = await prisma.monthlyReport.delete({
     *   where: {
     *     // ... filter to delete one MonthlyReport
     *   }
     * })
     * 
     */
    delete<T extends MonthlyReportDeleteArgs>(args: SelectSubset<T, MonthlyReportDeleteArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MonthlyReport.
     * @param {MonthlyReportUpdateArgs} args - Arguments to update one MonthlyReport.
     * @example
     * // Update one MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MonthlyReportUpdateArgs>(args: SelectSubset<T, MonthlyReportUpdateArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MonthlyReports.
     * @param {MonthlyReportDeleteManyArgs} args - Arguments to filter MonthlyReports to delete.
     * @example
     * // Delete a few MonthlyReports
     * const { count } = await prisma.monthlyReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MonthlyReportDeleteManyArgs>(args?: SelectSubset<T, MonthlyReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MonthlyReports
     * const monthlyReport = await prisma.monthlyReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MonthlyReportUpdateManyArgs>(args: SelectSubset<T, MonthlyReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyReports and returns the data updated in the database.
     * @param {MonthlyReportUpdateManyAndReturnArgs} args - Arguments to update many MonthlyReports.
     * @example
     * // Update many MonthlyReports
     * const monthlyReport = await prisma.monthlyReport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MonthlyReports and only return the `id`
     * const monthlyReportWithIdOnly = await prisma.monthlyReport.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MonthlyReportUpdateManyAndReturnArgs>(args: SelectSubset<T, MonthlyReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MonthlyReport.
     * @param {MonthlyReportUpsertArgs} args - Arguments to update or create a MonthlyReport.
     * @example
     * // Update or create a MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.upsert({
     *   create: {
     *     // ... data to create a MonthlyReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MonthlyReport we want to update
     *   }
     * })
     */
    upsert<T extends MonthlyReportUpsertArgs>(args: SelectSubset<T, MonthlyReportUpsertArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MonthlyReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportCountArgs} args - Arguments to filter MonthlyReports to count.
     * @example
     * // Count the number of MonthlyReports
     * const count = await prisma.monthlyReport.count({
     *   where: {
     *     // ... the filter for the MonthlyReports we want to count
     *   }
     * })
    **/
    count<T extends MonthlyReportCountArgs>(
      args?: Subset<T, MonthlyReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MonthlyReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MonthlyReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MonthlyReportAggregateArgs>(args: Subset<T, MonthlyReportAggregateArgs>): Prisma.PrismaPromise<GetMonthlyReportAggregateType<T>>

    /**
     * Group by MonthlyReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MonthlyReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MonthlyReportGroupByArgs['orderBy'] }
        : { orderBy?: MonthlyReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MonthlyReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMonthlyReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MonthlyReport model
   */
  readonly fields: MonthlyReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MonthlyReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MonthlyReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MonthlyReport model
   */
  interface MonthlyReportFieldRefs {
    readonly id: FieldRef<"MonthlyReport", 'String'>
    readonly reportDate: FieldRef<"MonthlyReport", 'DateTime'>
    readonly interestCollected: FieldRef<"MonthlyReport", 'Float'>
    readonly loansDisbursed: FieldRef<"MonthlyReport", 'Float'>
    readonly principalRecovered: FieldRef<"MonthlyReport", 'Float'>
    readonly totalInterest: FieldRef<"MonthlyReport", 'Float'>
    readonly totalMembersFund: FieldRef<"MonthlyReport", 'Float'>
    readonly totalDistributed: FieldRef<"MonthlyReport", 'Float'>
    readonly cashInHand: FieldRef<"MonthlyReport", 'Float'>
    readonly totalGroupValue: FieldRef<"MonthlyReport", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * MonthlyReport findUnique
   */
  export type MonthlyReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Filter, which MonthlyReport to fetch.
     */
    where: MonthlyReportWhereUniqueInput
  }

  /**
   * MonthlyReport findUniqueOrThrow
   */
  export type MonthlyReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Filter, which MonthlyReport to fetch.
     */
    where: MonthlyReportWhereUniqueInput
  }

  /**
   * MonthlyReport findFirst
   */
  export type MonthlyReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Filter, which MonthlyReport to fetch.
     */
    where?: MonthlyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyReports to fetch.
     */
    orderBy?: MonthlyReportOrderByWithRelationInput | MonthlyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyReports.
     */
    cursor?: MonthlyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyReports.
     */
    distinct?: MonthlyReportScalarFieldEnum | MonthlyReportScalarFieldEnum[]
  }

  /**
   * MonthlyReport findFirstOrThrow
   */
  export type MonthlyReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Filter, which MonthlyReport to fetch.
     */
    where?: MonthlyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyReports to fetch.
     */
    orderBy?: MonthlyReportOrderByWithRelationInput | MonthlyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyReports.
     */
    cursor?: MonthlyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyReports.
     */
    distinct?: MonthlyReportScalarFieldEnum | MonthlyReportScalarFieldEnum[]
  }

  /**
   * MonthlyReport findMany
   */
  export type MonthlyReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Filter, which MonthlyReports to fetch.
     */
    where?: MonthlyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyReports to fetch.
     */
    orderBy?: MonthlyReportOrderByWithRelationInput | MonthlyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MonthlyReports.
     */
    cursor?: MonthlyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyReports.
     */
    distinct?: MonthlyReportScalarFieldEnum | MonthlyReportScalarFieldEnum[]
  }

  /**
   * MonthlyReport create
   */
  export type MonthlyReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * The data needed to create a MonthlyReport.
     */
    data: XOR<MonthlyReportCreateInput, MonthlyReportUncheckedCreateInput>
  }

  /**
   * MonthlyReport createMany
   */
  export type MonthlyReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MonthlyReports.
     */
    data: MonthlyReportCreateManyInput | MonthlyReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MonthlyReport createManyAndReturn
   */
  export type MonthlyReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * The data used to create many MonthlyReports.
     */
    data: MonthlyReportCreateManyInput | MonthlyReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MonthlyReport update
   */
  export type MonthlyReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * The data needed to update a MonthlyReport.
     */
    data: XOR<MonthlyReportUpdateInput, MonthlyReportUncheckedUpdateInput>
    /**
     * Choose, which MonthlyReport to update.
     */
    where: MonthlyReportWhereUniqueInput
  }

  /**
   * MonthlyReport updateMany
   */
  export type MonthlyReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MonthlyReports.
     */
    data: XOR<MonthlyReportUpdateManyMutationInput, MonthlyReportUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyReports to update
     */
    where?: MonthlyReportWhereInput
    /**
     * Limit how many MonthlyReports to update.
     */
    limit?: number
  }

  /**
   * MonthlyReport updateManyAndReturn
   */
  export type MonthlyReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * The data used to update MonthlyReports.
     */
    data: XOR<MonthlyReportUpdateManyMutationInput, MonthlyReportUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyReports to update
     */
    where?: MonthlyReportWhereInput
    /**
     * Limit how many MonthlyReports to update.
     */
    limit?: number
  }

  /**
   * MonthlyReport upsert
   */
  export type MonthlyReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * The filter to search for the MonthlyReport to update in case it exists.
     */
    where: MonthlyReportWhereUniqueInput
    /**
     * In case the MonthlyReport found by the `where` argument doesn't exist, create a new MonthlyReport with this data.
     */
    create: XOR<MonthlyReportCreateInput, MonthlyReportUncheckedCreateInput>
    /**
     * In case the MonthlyReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MonthlyReportUpdateInput, MonthlyReportUncheckedUpdateInput>
  }

  /**
   * MonthlyReport delete
   */
  export type MonthlyReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Filter which MonthlyReport to delete.
     */
    where: MonthlyReportWhereUniqueInput
  }

  /**
   * MonthlyReport deleteMany
   */
  export type MonthlyReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyReports to delete
     */
    where?: MonthlyReportWhereInput
    /**
     * Limit how many MonthlyReports to delete.
     */
    limit?: number
  }

  /**
   * MonthlyReport without action
   */
  export type MonthlyReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MemberScalarFieldEnum: {
    id: 'id',
    memberId: 'memberId',
    name: 'name',
    phone: 'phone',
    email: 'email',
    clerkId: 'clerkId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MemberScalarFieldEnum = (typeof MemberScalarFieldEnum)[keyof typeof MemberScalarFieldEnum]


  export const GlobalSettingsScalarFieldEnum: {
    id: 'id',
    monthlyContribution: 'monthlyContribution',
    memberInterestRate: 'memberInterestRate',
    marketInterestRate: 'marketInterestRate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GlobalSettingsScalarFieldEnum = (typeof GlobalSettingsScalarFieldEnum)[keyof typeof GlobalSettingsScalarFieldEnum]


  export const MemberLoanScalarFieldEnum: {
    id: 'id',
    memberId: 'memberId',
    amount: 'amount',
    interestRate: 'interestRate',
    status: 'status',
    issuedAt: 'issuedAt'
  };

  export type MemberLoanScalarFieldEnum = (typeof MemberLoanScalarFieldEnum)[keyof typeof MemberLoanScalarFieldEnum]


  export const MemberTransactionScalarFieldEnum: {
    id: 'id',
    memberId: 'memberId',
    loanId: 'loanId',
    amount: 'amount',
    type: 'type',
    date: 'date',
    description: 'description'
  };

  export type MemberTransactionScalarFieldEnum = (typeof MemberTransactionScalarFieldEnum)[keyof typeof MemberTransactionScalarFieldEnum]


  export const MonthlyReportScalarFieldEnum: {
    id: 'id',
    reportDate: 'reportDate',
    interestCollected: 'interestCollected',
    loansDisbursed: 'loansDisbursed',
    principalRecovered: 'principalRecovered',
    totalInterest: 'totalInterest',
    totalMembersFund: 'totalMembersFund',
    totalDistributed: 'totalDistributed',
    cashInHand: 'cashInHand',
    totalGroupValue: 'totalGroupValue'
  };

  export type MonthlyReportScalarFieldEnum = (typeof MonthlyReportScalarFieldEnum)[keyof typeof MonthlyReportScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'LoanStatus'
   */
  export type EnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus'>
    


  /**
   * Reference to a field of type 'LoanStatus[]'
   */
  export type ListEnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus[]'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'TransactionType[]'
   */
  export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>
    
  /**
   * Deep Input Types
   */


  export type MemberWhereInput = {
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    id?: IntFilter<"Member"> | number
    memberId?: StringFilter<"Member"> | string
    name?: StringFilter<"Member"> | string
    phone?: StringNullableFilter<"Member"> | string | null
    email?: StringNullableFilter<"Member"> | string | null
    clerkId?: StringFilter<"Member"> | string
    createdAt?: DateTimeFilter<"Member"> | Date | string
    updatedAt?: DateTimeFilter<"Member"> | Date | string
    loans?: MemberLoanListRelationFilter
    transactions?: MemberTransactionListRelationFilter
  }

  export type MemberOrderByWithRelationInput = {
    id?: SortOrder
    memberId?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    clerkId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    loans?: MemberLoanOrderByRelationAggregateInput
    transactions?: MemberTransactionOrderByRelationAggregateInput
  }

  export type MemberWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    memberId?: string
    email?: string
    clerkId?: string
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    name?: StringFilter<"Member"> | string
    phone?: StringNullableFilter<"Member"> | string | null
    createdAt?: DateTimeFilter<"Member"> | Date | string
    updatedAt?: DateTimeFilter<"Member"> | Date | string
    loans?: MemberLoanListRelationFilter
    transactions?: MemberTransactionListRelationFilter
  }, "id" | "memberId" | "email" | "clerkId">

  export type MemberOrderByWithAggregationInput = {
    id?: SortOrder
    memberId?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    clerkId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MemberCountOrderByAggregateInput
    _avg?: MemberAvgOrderByAggregateInput
    _max?: MemberMaxOrderByAggregateInput
    _min?: MemberMinOrderByAggregateInput
    _sum?: MemberSumOrderByAggregateInput
  }

  export type MemberScalarWhereWithAggregatesInput = {
    AND?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    OR?: MemberScalarWhereWithAggregatesInput[]
    NOT?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Member"> | number
    memberId?: StringWithAggregatesFilter<"Member"> | string
    name?: StringWithAggregatesFilter<"Member"> | string
    phone?: StringNullableWithAggregatesFilter<"Member"> | string | null
    email?: StringNullableWithAggregatesFilter<"Member"> | string | null
    clerkId?: StringWithAggregatesFilter<"Member"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Member"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Member"> | Date | string
  }

  export type GlobalSettingsWhereInput = {
    AND?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    OR?: GlobalSettingsWhereInput[]
    NOT?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    id?: IntFilter<"GlobalSettings"> | number
    monthlyContribution?: FloatFilter<"GlobalSettings"> | number
    memberInterestRate?: FloatFilter<"GlobalSettings"> | number
    marketInterestRate?: FloatFilter<"GlobalSettings"> | number
    createdAt?: DateTimeFilter<"GlobalSettings"> | Date | string
    updatedAt?: DateTimeFilter<"GlobalSettings"> | Date | string
  }

  export type GlobalSettingsOrderByWithRelationInput = {
    id?: SortOrder
    monthlyContribution?: SortOrder
    memberInterestRate?: SortOrder
    marketInterestRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GlobalSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    OR?: GlobalSettingsWhereInput[]
    NOT?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    monthlyContribution?: FloatFilter<"GlobalSettings"> | number
    memberInterestRate?: FloatFilter<"GlobalSettings"> | number
    marketInterestRate?: FloatFilter<"GlobalSettings"> | number
    createdAt?: DateTimeFilter<"GlobalSettings"> | Date | string
    updatedAt?: DateTimeFilter<"GlobalSettings"> | Date | string
  }, "id">

  export type GlobalSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    monthlyContribution?: SortOrder
    memberInterestRate?: SortOrder
    marketInterestRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GlobalSettingsCountOrderByAggregateInput
    _avg?: GlobalSettingsAvgOrderByAggregateInput
    _max?: GlobalSettingsMaxOrderByAggregateInput
    _min?: GlobalSettingsMinOrderByAggregateInput
    _sum?: GlobalSettingsSumOrderByAggregateInput
  }

  export type GlobalSettingsScalarWhereWithAggregatesInput = {
    AND?: GlobalSettingsScalarWhereWithAggregatesInput | GlobalSettingsScalarWhereWithAggregatesInput[]
    OR?: GlobalSettingsScalarWhereWithAggregatesInput[]
    NOT?: GlobalSettingsScalarWhereWithAggregatesInput | GlobalSettingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GlobalSettings"> | number
    monthlyContribution?: FloatWithAggregatesFilter<"GlobalSettings"> | number
    memberInterestRate?: FloatWithAggregatesFilter<"GlobalSettings"> | number
    marketInterestRate?: FloatWithAggregatesFilter<"GlobalSettings"> | number
    createdAt?: DateTimeWithAggregatesFilter<"GlobalSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GlobalSettings"> | Date | string
  }

  export type MemberLoanWhereInput = {
    AND?: MemberLoanWhereInput | MemberLoanWhereInput[]
    OR?: MemberLoanWhereInput[]
    NOT?: MemberLoanWhereInput | MemberLoanWhereInput[]
    id?: StringFilter<"MemberLoan"> | string
    memberId?: StringFilter<"MemberLoan"> | string
    amount?: FloatFilter<"MemberLoan"> | number
    interestRate?: FloatFilter<"MemberLoan"> | number
    status?: EnumLoanStatusFilter<"MemberLoan"> | $Enums.LoanStatus
    issuedAt?: DateTimeFilter<"MemberLoan"> | Date | string
    member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    transactions?: MemberTransactionListRelationFilter
  }

  export type MemberLoanOrderByWithRelationInput = {
    id?: SortOrder
    memberId?: SortOrder
    amount?: SortOrder
    interestRate?: SortOrder
    status?: SortOrder
    issuedAt?: SortOrder
    member?: MemberOrderByWithRelationInput
    transactions?: MemberTransactionOrderByRelationAggregateInput
  }

  export type MemberLoanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MemberLoanWhereInput | MemberLoanWhereInput[]
    OR?: MemberLoanWhereInput[]
    NOT?: MemberLoanWhereInput | MemberLoanWhereInput[]
    memberId?: StringFilter<"MemberLoan"> | string
    amount?: FloatFilter<"MemberLoan"> | number
    interestRate?: FloatFilter<"MemberLoan"> | number
    status?: EnumLoanStatusFilter<"MemberLoan"> | $Enums.LoanStatus
    issuedAt?: DateTimeFilter<"MemberLoan"> | Date | string
    member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    transactions?: MemberTransactionListRelationFilter
  }, "id">

  export type MemberLoanOrderByWithAggregationInput = {
    id?: SortOrder
    memberId?: SortOrder
    amount?: SortOrder
    interestRate?: SortOrder
    status?: SortOrder
    issuedAt?: SortOrder
    _count?: MemberLoanCountOrderByAggregateInput
    _avg?: MemberLoanAvgOrderByAggregateInput
    _max?: MemberLoanMaxOrderByAggregateInput
    _min?: MemberLoanMinOrderByAggregateInput
    _sum?: MemberLoanSumOrderByAggregateInput
  }

  export type MemberLoanScalarWhereWithAggregatesInput = {
    AND?: MemberLoanScalarWhereWithAggregatesInput | MemberLoanScalarWhereWithAggregatesInput[]
    OR?: MemberLoanScalarWhereWithAggregatesInput[]
    NOT?: MemberLoanScalarWhereWithAggregatesInput | MemberLoanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MemberLoan"> | string
    memberId?: StringWithAggregatesFilter<"MemberLoan"> | string
    amount?: FloatWithAggregatesFilter<"MemberLoan"> | number
    interestRate?: FloatWithAggregatesFilter<"MemberLoan"> | number
    status?: EnumLoanStatusWithAggregatesFilter<"MemberLoan"> | $Enums.LoanStatus
    issuedAt?: DateTimeWithAggregatesFilter<"MemberLoan"> | Date | string
  }

  export type MemberTransactionWhereInput = {
    AND?: MemberTransactionWhereInput | MemberTransactionWhereInput[]
    OR?: MemberTransactionWhereInput[]
    NOT?: MemberTransactionWhereInput | MemberTransactionWhereInput[]
    id?: StringFilter<"MemberTransaction"> | string
    memberId?: StringFilter<"MemberTransaction"> | string
    loanId?: StringNullableFilter<"MemberTransaction"> | string | null
    amount?: FloatFilter<"MemberTransaction"> | number
    type?: EnumTransactionTypeFilter<"MemberTransaction"> | $Enums.TransactionType
    date?: DateTimeFilter<"MemberTransaction"> | Date | string
    description?: StringNullableFilter<"MemberTransaction"> | string | null
    member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    loan?: XOR<MemberLoanNullableScalarRelationFilter, MemberLoanWhereInput> | null
  }

  export type MemberTransactionOrderByWithRelationInput = {
    id?: SortOrder
    memberId?: SortOrder
    loanId?: SortOrderInput | SortOrder
    amount?: SortOrder
    type?: SortOrder
    date?: SortOrder
    description?: SortOrderInput | SortOrder
    member?: MemberOrderByWithRelationInput
    loan?: MemberLoanOrderByWithRelationInput
  }

  export type MemberTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MemberTransactionWhereInput | MemberTransactionWhereInput[]
    OR?: MemberTransactionWhereInput[]
    NOT?: MemberTransactionWhereInput | MemberTransactionWhereInput[]
    memberId?: StringFilter<"MemberTransaction"> | string
    loanId?: StringNullableFilter<"MemberTransaction"> | string | null
    amount?: FloatFilter<"MemberTransaction"> | number
    type?: EnumTransactionTypeFilter<"MemberTransaction"> | $Enums.TransactionType
    date?: DateTimeFilter<"MemberTransaction"> | Date | string
    description?: StringNullableFilter<"MemberTransaction"> | string | null
    member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    loan?: XOR<MemberLoanNullableScalarRelationFilter, MemberLoanWhereInput> | null
  }, "id">

  export type MemberTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    memberId?: SortOrder
    loanId?: SortOrderInput | SortOrder
    amount?: SortOrder
    type?: SortOrder
    date?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: MemberTransactionCountOrderByAggregateInput
    _avg?: MemberTransactionAvgOrderByAggregateInput
    _max?: MemberTransactionMaxOrderByAggregateInput
    _min?: MemberTransactionMinOrderByAggregateInput
    _sum?: MemberTransactionSumOrderByAggregateInput
  }

  export type MemberTransactionScalarWhereWithAggregatesInput = {
    AND?: MemberTransactionScalarWhereWithAggregatesInput | MemberTransactionScalarWhereWithAggregatesInput[]
    OR?: MemberTransactionScalarWhereWithAggregatesInput[]
    NOT?: MemberTransactionScalarWhereWithAggregatesInput | MemberTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MemberTransaction"> | string
    memberId?: StringWithAggregatesFilter<"MemberTransaction"> | string
    loanId?: StringNullableWithAggregatesFilter<"MemberTransaction"> | string | null
    amount?: FloatWithAggregatesFilter<"MemberTransaction"> | number
    type?: EnumTransactionTypeWithAggregatesFilter<"MemberTransaction"> | $Enums.TransactionType
    date?: DateTimeWithAggregatesFilter<"MemberTransaction"> | Date | string
    description?: StringNullableWithAggregatesFilter<"MemberTransaction"> | string | null
  }

  export type MonthlyReportWhereInput = {
    AND?: MonthlyReportWhereInput | MonthlyReportWhereInput[]
    OR?: MonthlyReportWhereInput[]
    NOT?: MonthlyReportWhereInput | MonthlyReportWhereInput[]
    id?: StringFilter<"MonthlyReport"> | string
    reportDate?: DateTimeFilter<"MonthlyReport"> | Date | string
    interestCollected?: FloatFilter<"MonthlyReport"> | number
    loansDisbursed?: FloatFilter<"MonthlyReport"> | number
    principalRecovered?: FloatFilter<"MonthlyReport"> | number
    totalInterest?: FloatFilter<"MonthlyReport"> | number
    totalMembersFund?: FloatFilter<"MonthlyReport"> | number
    totalDistributed?: FloatFilter<"MonthlyReport"> | number
    cashInHand?: FloatFilter<"MonthlyReport"> | number
    totalGroupValue?: FloatFilter<"MonthlyReport"> | number
  }

  export type MonthlyReportOrderByWithRelationInput = {
    id?: SortOrder
    reportDate?: SortOrder
    interestCollected?: SortOrder
    loansDisbursed?: SortOrder
    principalRecovered?: SortOrder
    totalInterest?: SortOrder
    totalMembersFund?: SortOrder
    totalDistributed?: SortOrder
    cashInHand?: SortOrder
    totalGroupValue?: SortOrder
  }

  export type MonthlyReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    reportDate?: Date | string
    AND?: MonthlyReportWhereInput | MonthlyReportWhereInput[]
    OR?: MonthlyReportWhereInput[]
    NOT?: MonthlyReportWhereInput | MonthlyReportWhereInput[]
    interestCollected?: FloatFilter<"MonthlyReport"> | number
    loansDisbursed?: FloatFilter<"MonthlyReport"> | number
    principalRecovered?: FloatFilter<"MonthlyReport"> | number
    totalInterest?: FloatFilter<"MonthlyReport"> | number
    totalMembersFund?: FloatFilter<"MonthlyReport"> | number
    totalDistributed?: FloatFilter<"MonthlyReport"> | number
    cashInHand?: FloatFilter<"MonthlyReport"> | number
    totalGroupValue?: FloatFilter<"MonthlyReport"> | number
  }, "id" | "reportDate">

  export type MonthlyReportOrderByWithAggregationInput = {
    id?: SortOrder
    reportDate?: SortOrder
    interestCollected?: SortOrder
    loansDisbursed?: SortOrder
    principalRecovered?: SortOrder
    totalInterest?: SortOrder
    totalMembersFund?: SortOrder
    totalDistributed?: SortOrder
    cashInHand?: SortOrder
    totalGroupValue?: SortOrder
    _count?: MonthlyReportCountOrderByAggregateInput
    _avg?: MonthlyReportAvgOrderByAggregateInput
    _max?: MonthlyReportMaxOrderByAggregateInput
    _min?: MonthlyReportMinOrderByAggregateInput
    _sum?: MonthlyReportSumOrderByAggregateInput
  }

  export type MonthlyReportScalarWhereWithAggregatesInput = {
    AND?: MonthlyReportScalarWhereWithAggregatesInput | MonthlyReportScalarWhereWithAggregatesInput[]
    OR?: MonthlyReportScalarWhereWithAggregatesInput[]
    NOT?: MonthlyReportScalarWhereWithAggregatesInput | MonthlyReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MonthlyReport"> | string
    reportDate?: DateTimeWithAggregatesFilter<"MonthlyReport"> | Date | string
    interestCollected?: FloatWithAggregatesFilter<"MonthlyReport"> | number
    loansDisbursed?: FloatWithAggregatesFilter<"MonthlyReport"> | number
    principalRecovered?: FloatWithAggregatesFilter<"MonthlyReport"> | number
    totalInterest?: FloatWithAggregatesFilter<"MonthlyReport"> | number
    totalMembersFund?: FloatWithAggregatesFilter<"MonthlyReport"> | number
    totalDistributed?: FloatWithAggregatesFilter<"MonthlyReport"> | number
    cashInHand?: FloatWithAggregatesFilter<"MonthlyReport"> | number
    totalGroupValue?: FloatWithAggregatesFilter<"MonthlyReport"> | number
  }

  export type MemberCreateInput = {
    memberId: string
    name: string
    phone?: string | null
    email?: string | null
    clerkId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: MemberLoanCreateNestedManyWithoutMemberInput
    transactions?: MemberTransactionCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateInput = {
    id?: number
    memberId: string
    name: string
    phone?: string | null
    email?: string | null
    clerkId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: MemberLoanUncheckedCreateNestedManyWithoutMemberInput
    transactions?: MemberTransactionUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberUpdateInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: MemberLoanUpdateManyWithoutMemberNestedInput
    transactions?: MemberTransactionUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    memberId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: MemberLoanUncheckedUpdateManyWithoutMemberNestedInput
    transactions?: MemberTransactionUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type MemberCreateManyInput = {
    id?: number
    memberId: string
    name: string
    phone?: string | null
    email?: string | null
    clerkId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberUpdateManyMutationInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    memberId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsCreateInput = {
    monthlyContribution?: number
    memberInterestRate?: number
    marketInterestRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GlobalSettingsUncheckedCreateInput = {
    id?: number
    monthlyContribution?: number
    memberInterestRate?: number
    marketInterestRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GlobalSettingsUpdateInput = {
    monthlyContribution?: FloatFieldUpdateOperationsInput | number
    memberInterestRate?: FloatFieldUpdateOperationsInput | number
    marketInterestRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    monthlyContribution?: FloatFieldUpdateOperationsInput | number
    memberInterestRate?: FloatFieldUpdateOperationsInput | number
    marketInterestRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsCreateManyInput = {
    id?: number
    monthlyContribution?: number
    memberInterestRate?: number
    marketInterestRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GlobalSettingsUpdateManyMutationInput = {
    monthlyContribution?: FloatFieldUpdateOperationsInput | number
    memberInterestRate?: FloatFieldUpdateOperationsInput | number
    marketInterestRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    monthlyContribution?: FloatFieldUpdateOperationsInput | number
    memberInterestRate?: FloatFieldUpdateOperationsInput | number
    marketInterestRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberLoanCreateInput = {
    id?: string
    amount: number
    interestRate?: number
    status?: $Enums.LoanStatus
    issuedAt?: Date | string
    member: MemberCreateNestedOneWithoutLoansInput
    transactions?: MemberTransactionCreateNestedManyWithoutLoanInput
  }

  export type MemberLoanUncheckedCreateInput = {
    id?: string
    memberId: string
    amount: number
    interestRate?: number
    status?: $Enums.LoanStatus
    issuedAt?: Date | string
    transactions?: MemberTransactionUncheckedCreateNestedManyWithoutLoanInput
  }

  export type MemberLoanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    interestRate?: FloatFieldUpdateOperationsInput | number
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutLoansNestedInput
    transactions?: MemberTransactionUpdateManyWithoutLoanNestedInput
  }

  export type MemberLoanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    interestRate?: FloatFieldUpdateOperationsInput | number
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: MemberTransactionUncheckedUpdateManyWithoutLoanNestedInput
  }

  export type MemberLoanCreateManyInput = {
    id?: string
    memberId: string
    amount: number
    interestRate?: number
    status?: $Enums.LoanStatus
    issuedAt?: Date | string
  }

  export type MemberLoanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    interestRate?: FloatFieldUpdateOperationsInput | number
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberLoanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    interestRate?: FloatFieldUpdateOperationsInput | number
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberTransactionCreateInput = {
    id?: string
    amount: number
    type: $Enums.TransactionType
    date?: Date | string
    description?: string | null
    member: MemberCreateNestedOneWithoutTransactionsInput
    loan?: MemberLoanCreateNestedOneWithoutTransactionsInput
  }

  export type MemberTransactionUncheckedCreateInput = {
    id?: string
    memberId: string
    loanId?: string | null
    amount: number
    type: $Enums.TransactionType
    date?: Date | string
    description?: string | null
  }

  export type MemberTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    member?: MemberUpdateOneRequiredWithoutTransactionsNestedInput
    loan?: MemberLoanUpdateOneWithoutTransactionsNestedInput
  }

  export type MemberTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MemberTransactionCreateManyInput = {
    id?: string
    memberId: string
    loanId?: string | null
    amount: number
    type: $Enums.TransactionType
    date?: Date | string
    description?: string | null
  }

  export type MemberTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MemberTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MonthlyReportCreateInput = {
    id?: string
    reportDate: Date | string
    interestCollected?: number
    loansDisbursed?: number
    principalRecovered?: number
    totalInterest?: number
    totalMembersFund?: number
    totalDistributed?: number
    cashInHand?: number
    totalGroupValue?: number
  }

  export type MonthlyReportUncheckedCreateInput = {
    id?: string
    reportDate: Date | string
    interestCollected?: number
    loansDisbursed?: number
    principalRecovered?: number
    totalInterest?: number
    totalMembersFund?: number
    totalDistributed?: number
    cashInHand?: number
    totalGroupValue?: number
  }

  export type MonthlyReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    interestCollected?: FloatFieldUpdateOperationsInput | number
    loansDisbursed?: FloatFieldUpdateOperationsInput | number
    principalRecovered?: FloatFieldUpdateOperationsInput | number
    totalInterest?: FloatFieldUpdateOperationsInput | number
    totalMembersFund?: FloatFieldUpdateOperationsInput | number
    totalDistributed?: FloatFieldUpdateOperationsInput | number
    cashInHand?: FloatFieldUpdateOperationsInput | number
    totalGroupValue?: FloatFieldUpdateOperationsInput | number
  }

  export type MonthlyReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    interestCollected?: FloatFieldUpdateOperationsInput | number
    loansDisbursed?: FloatFieldUpdateOperationsInput | number
    principalRecovered?: FloatFieldUpdateOperationsInput | number
    totalInterest?: FloatFieldUpdateOperationsInput | number
    totalMembersFund?: FloatFieldUpdateOperationsInput | number
    totalDistributed?: FloatFieldUpdateOperationsInput | number
    cashInHand?: FloatFieldUpdateOperationsInput | number
    totalGroupValue?: FloatFieldUpdateOperationsInput | number
  }

  export type MonthlyReportCreateManyInput = {
    id?: string
    reportDate: Date | string
    interestCollected?: number
    loansDisbursed?: number
    principalRecovered?: number
    totalInterest?: number
    totalMembersFund?: number
    totalDistributed?: number
    cashInHand?: number
    totalGroupValue?: number
  }

  export type MonthlyReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    interestCollected?: FloatFieldUpdateOperationsInput | number
    loansDisbursed?: FloatFieldUpdateOperationsInput | number
    principalRecovered?: FloatFieldUpdateOperationsInput | number
    totalInterest?: FloatFieldUpdateOperationsInput | number
    totalMembersFund?: FloatFieldUpdateOperationsInput | number
    totalDistributed?: FloatFieldUpdateOperationsInput | number
    cashInHand?: FloatFieldUpdateOperationsInput | number
    totalGroupValue?: FloatFieldUpdateOperationsInput | number
  }

  export type MonthlyReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportDate?: DateTimeFieldUpdateOperationsInput | Date | string
    interestCollected?: FloatFieldUpdateOperationsInput | number
    loansDisbursed?: FloatFieldUpdateOperationsInput | number
    principalRecovered?: FloatFieldUpdateOperationsInput | number
    totalInterest?: FloatFieldUpdateOperationsInput | number
    totalMembersFund?: FloatFieldUpdateOperationsInput | number
    totalDistributed?: FloatFieldUpdateOperationsInput | number
    cashInHand?: FloatFieldUpdateOperationsInput | number
    totalGroupValue?: FloatFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MemberLoanListRelationFilter = {
    every?: MemberLoanWhereInput
    some?: MemberLoanWhereInput
    none?: MemberLoanWhereInput
  }

  export type MemberTransactionListRelationFilter = {
    every?: MemberTransactionWhereInput
    some?: MemberTransactionWhereInput
    none?: MemberTransactionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MemberLoanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemberTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemberCountOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    clerkId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MemberMaxOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    clerkId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberMinOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    clerkId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type GlobalSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    monthlyContribution?: SortOrder
    memberInterestRate?: SortOrder
    marketInterestRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GlobalSettingsAvgOrderByAggregateInput = {
    id?: SortOrder
    monthlyContribution?: SortOrder
    memberInterestRate?: SortOrder
    marketInterestRate?: SortOrder
  }

  export type GlobalSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    monthlyContribution?: SortOrder
    memberInterestRate?: SortOrder
    marketInterestRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GlobalSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    monthlyContribution?: SortOrder
    memberInterestRate?: SortOrder
    marketInterestRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GlobalSettingsSumOrderByAggregateInput = {
    id?: SortOrder
    monthlyContribution?: SortOrder
    memberInterestRate?: SortOrder
    marketInterestRate?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumLoanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusFilter<$PrismaModel> | $Enums.LoanStatus
  }

  export type MemberScalarRelationFilter = {
    is?: MemberWhereInput
    isNot?: MemberWhereInput
  }

  export type MemberLoanCountOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    amount?: SortOrder
    interestRate?: SortOrder
    status?: SortOrder
    issuedAt?: SortOrder
  }

  export type MemberLoanAvgOrderByAggregateInput = {
    amount?: SortOrder
    interestRate?: SortOrder
  }

  export type MemberLoanMaxOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    amount?: SortOrder
    interestRate?: SortOrder
    status?: SortOrder
    issuedAt?: SortOrder
  }

  export type MemberLoanMinOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    amount?: SortOrder
    interestRate?: SortOrder
    status?: SortOrder
    issuedAt?: SortOrder
  }

  export type MemberLoanSumOrderByAggregateInput = {
    amount?: SortOrder
    interestRate?: SortOrder
  }

  export type EnumLoanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel> | $Enums.LoanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanStatusFilter<$PrismaModel>
    _max?: NestedEnumLoanStatusFilter<$PrismaModel>
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type MemberLoanNullableScalarRelationFilter = {
    is?: MemberLoanWhereInput | null
    isNot?: MemberLoanWhereInput | null
  }

  export type MemberTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    loanId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    date?: SortOrder
    description?: SortOrder
  }

  export type MemberTransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type MemberTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    loanId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    date?: SortOrder
    description?: SortOrder
  }

  export type MemberTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    loanId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    date?: SortOrder
    description?: SortOrder
  }

  export type MemberTransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type MonthlyReportCountOrderByAggregateInput = {
    id?: SortOrder
    reportDate?: SortOrder
    interestCollected?: SortOrder
    loansDisbursed?: SortOrder
    principalRecovered?: SortOrder
    totalInterest?: SortOrder
    totalMembersFund?: SortOrder
    totalDistributed?: SortOrder
    cashInHand?: SortOrder
    totalGroupValue?: SortOrder
  }

  export type MonthlyReportAvgOrderByAggregateInput = {
    interestCollected?: SortOrder
    loansDisbursed?: SortOrder
    principalRecovered?: SortOrder
    totalInterest?: SortOrder
    totalMembersFund?: SortOrder
    totalDistributed?: SortOrder
    cashInHand?: SortOrder
    totalGroupValue?: SortOrder
  }

  export type MonthlyReportMaxOrderByAggregateInput = {
    id?: SortOrder
    reportDate?: SortOrder
    interestCollected?: SortOrder
    loansDisbursed?: SortOrder
    principalRecovered?: SortOrder
    totalInterest?: SortOrder
    totalMembersFund?: SortOrder
    totalDistributed?: SortOrder
    cashInHand?: SortOrder
    totalGroupValue?: SortOrder
  }

  export type MonthlyReportMinOrderByAggregateInput = {
    id?: SortOrder
    reportDate?: SortOrder
    interestCollected?: SortOrder
    loansDisbursed?: SortOrder
    principalRecovered?: SortOrder
    totalInterest?: SortOrder
    totalMembersFund?: SortOrder
    totalDistributed?: SortOrder
    cashInHand?: SortOrder
    totalGroupValue?: SortOrder
  }

  export type MonthlyReportSumOrderByAggregateInput = {
    interestCollected?: SortOrder
    loansDisbursed?: SortOrder
    principalRecovered?: SortOrder
    totalInterest?: SortOrder
    totalMembersFund?: SortOrder
    totalDistributed?: SortOrder
    cashInHand?: SortOrder
    totalGroupValue?: SortOrder
  }

  export type MemberLoanCreateNestedManyWithoutMemberInput = {
    create?: XOR<MemberLoanCreateWithoutMemberInput, MemberLoanUncheckedCreateWithoutMemberInput> | MemberLoanCreateWithoutMemberInput[] | MemberLoanUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MemberLoanCreateOrConnectWithoutMemberInput | MemberLoanCreateOrConnectWithoutMemberInput[]
    createMany?: MemberLoanCreateManyMemberInputEnvelope
    connect?: MemberLoanWhereUniqueInput | MemberLoanWhereUniqueInput[]
  }

  export type MemberTransactionCreateNestedManyWithoutMemberInput = {
    create?: XOR<MemberTransactionCreateWithoutMemberInput, MemberTransactionUncheckedCreateWithoutMemberInput> | MemberTransactionCreateWithoutMemberInput[] | MemberTransactionUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MemberTransactionCreateOrConnectWithoutMemberInput | MemberTransactionCreateOrConnectWithoutMemberInput[]
    createMany?: MemberTransactionCreateManyMemberInputEnvelope
    connect?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
  }

  export type MemberLoanUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<MemberLoanCreateWithoutMemberInput, MemberLoanUncheckedCreateWithoutMemberInput> | MemberLoanCreateWithoutMemberInput[] | MemberLoanUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MemberLoanCreateOrConnectWithoutMemberInput | MemberLoanCreateOrConnectWithoutMemberInput[]
    createMany?: MemberLoanCreateManyMemberInputEnvelope
    connect?: MemberLoanWhereUniqueInput | MemberLoanWhereUniqueInput[]
  }

  export type MemberTransactionUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<MemberTransactionCreateWithoutMemberInput, MemberTransactionUncheckedCreateWithoutMemberInput> | MemberTransactionCreateWithoutMemberInput[] | MemberTransactionUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MemberTransactionCreateOrConnectWithoutMemberInput | MemberTransactionCreateOrConnectWithoutMemberInput[]
    createMany?: MemberTransactionCreateManyMemberInputEnvelope
    connect?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MemberLoanUpdateManyWithoutMemberNestedInput = {
    create?: XOR<MemberLoanCreateWithoutMemberInput, MemberLoanUncheckedCreateWithoutMemberInput> | MemberLoanCreateWithoutMemberInput[] | MemberLoanUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MemberLoanCreateOrConnectWithoutMemberInput | MemberLoanCreateOrConnectWithoutMemberInput[]
    upsert?: MemberLoanUpsertWithWhereUniqueWithoutMemberInput | MemberLoanUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: MemberLoanCreateManyMemberInputEnvelope
    set?: MemberLoanWhereUniqueInput | MemberLoanWhereUniqueInput[]
    disconnect?: MemberLoanWhereUniqueInput | MemberLoanWhereUniqueInput[]
    delete?: MemberLoanWhereUniqueInput | MemberLoanWhereUniqueInput[]
    connect?: MemberLoanWhereUniqueInput | MemberLoanWhereUniqueInput[]
    update?: MemberLoanUpdateWithWhereUniqueWithoutMemberInput | MemberLoanUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: MemberLoanUpdateManyWithWhereWithoutMemberInput | MemberLoanUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: MemberLoanScalarWhereInput | MemberLoanScalarWhereInput[]
  }

  export type MemberTransactionUpdateManyWithoutMemberNestedInput = {
    create?: XOR<MemberTransactionCreateWithoutMemberInput, MemberTransactionUncheckedCreateWithoutMemberInput> | MemberTransactionCreateWithoutMemberInput[] | MemberTransactionUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MemberTransactionCreateOrConnectWithoutMemberInput | MemberTransactionCreateOrConnectWithoutMemberInput[]
    upsert?: MemberTransactionUpsertWithWhereUniqueWithoutMemberInput | MemberTransactionUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: MemberTransactionCreateManyMemberInputEnvelope
    set?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
    disconnect?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
    delete?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
    connect?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
    update?: MemberTransactionUpdateWithWhereUniqueWithoutMemberInput | MemberTransactionUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: MemberTransactionUpdateManyWithWhereWithoutMemberInput | MemberTransactionUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: MemberTransactionScalarWhereInput | MemberTransactionScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MemberLoanUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<MemberLoanCreateWithoutMemberInput, MemberLoanUncheckedCreateWithoutMemberInput> | MemberLoanCreateWithoutMemberInput[] | MemberLoanUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MemberLoanCreateOrConnectWithoutMemberInput | MemberLoanCreateOrConnectWithoutMemberInput[]
    upsert?: MemberLoanUpsertWithWhereUniqueWithoutMemberInput | MemberLoanUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: MemberLoanCreateManyMemberInputEnvelope
    set?: MemberLoanWhereUniqueInput | MemberLoanWhereUniqueInput[]
    disconnect?: MemberLoanWhereUniqueInput | MemberLoanWhereUniqueInput[]
    delete?: MemberLoanWhereUniqueInput | MemberLoanWhereUniqueInput[]
    connect?: MemberLoanWhereUniqueInput | MemberLoanWhereUniqueInput[]
    update?: MemberLoanUpdateWithWhereUniqueWithoutMemberInput | MemberLoanUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: MemberLoanUpdateManyWithWhereWithoutMemberInput | MemberLoanUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: MemberLoanScalarWhereInput | MemberLoanScalarWhereInput[]
  }

  export type MemberTransactionUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<MemberTransactionCreateWithoutMemberInput, MemberTransactionUncheckedCreateWithoutMemberInput> | MemberTransactionCreateWithoutMemberInput[] | MemberTransactionUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MemberTransactionCreateOrConnectWithoutMemberInput | MemberTransactionCreateOrConnectWithoutMemberInput[]
    upsert?: MemberTransactionUpsertWithWhereUniqueWithoutMemberInput | MemberTransactionUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: MemberTransactionCreateManyMemberInputEnvelope
    set?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
    disconnect?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
    delete?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
    connect?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
    update?: MemberTransactionUpdateWithWhereUniqueWithoutMemberInput | MemberTransactionUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: MemberTransactionUpdateManyWithWhereWithoutMemberInput | MemberTransactionUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: MemberTransactionScalarWhereInput | MemberTransactionScalarWhereInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MemberCreateNestedOneWithoutLoansInput = {
    create?: XOR<MemberCreateWithoutLoansInput, MemberUncheckedCreateWithoutLoansInput>
    connectOrCreate?: MemberCreateOrConnectWithoutLoansInput
    connect?: MemberWhereUniqueInput
  }

  export type MemberTransactionCreateNestedManyWithoutLoanInput = {
    create?: XOR<MemberTransactionCreateWithoutLoanInput, MemberTransactionUncheckedCreateWithoutLoanInput> | MemberTransactionCreateWithoutLoanInput[] | MemberTransactionUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: MemberTransactionCreateOrConnectWithoutLoanInput | MemberTransactionCreateOrConnectWithoutLoanInput[]
    createMany?: MemberTransactionCreateManyLoanInputEnvelope
    connect?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
  }

  export type MemberTransactionUncheckedCreateNestedManyWithoutLoanInput = {
    create?: XOR<MemberTransactionCreateWithoutLoanInput, MemberTransactionUncheckedCreateWithoutLoanInput> | MemberTransactionCreateWithoutLoanInput[] | MemberTransactionUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: MemberTransactionCreateOrConnectWithoutLoanInput | MemberTransactionCreateOrConnectWithoutLoanInput[]
    createMany?: MemberTransactionCreateManyLoanInputEnvelope
    connect?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
  }

  export type EnumLoanStatusFieldUpdateOperationsInput = {
    set?: $Enums.LoanStatus
  }

  export type MemberUpdateOneRequiredWithoutLoansNestedInput = {
    create?: XOR<MemberCreateWithoutLoansInput, MemberUncheckedCreateWithoutLoansInput>
    connectOrCreate?: MemberCreateOrConnectWithoutLoansInput
    upsert?: MemberUpsertWithoutLoansInput
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutLoansInput, MemberUpdateWithoutLoansInput>, MemberUncheckedUpdateWithoutLoansInput>
  }

  export type MemberTransactionUpdateManyWithoutLoanNestedInput = {
    create?: XOR<MemberTransactionCreateWithoutLoanInput, MemberTransactionUncheckedCreateWithoutLoanInput> | MemberTransactionCreateWithoutLoanInput[] | MemberTransactionUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: MemberTransactionCreateOrConnectWithoutLoanInput | MemberTransactionCreateOrConnectWithoutLoanInput[]
    upsert?: MemberTransactionUpsertWithWhereUniqueWithoutLoanInput | MemberTransactionUpsertWithWhereUniqueWithoutLoanInput[]
    createMany?: MemberTransactionCreateManyLoanInputEnvelope
    set?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
    disconnect?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
    delete?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
    connect?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
    update?: MemberTransactionUpdateWithWhereUniqueWithoutLoanInput | MemberTransactionUpdateWithWhereUniqueWithoutLoanInput[]
    updateMany?: MemberTransactionUpdateManyWithWhereWithoutLoanInput | MemberTransactionUpdateManyWithWhereWithoutLoanInput[]
    deleteMany?: MemberTransactionScalarWhereInput | MemberTransactionScalarWhereInput[]
  }

  export type MemberTransactionUncheckedUpdateManyWithoutLoanNestedInput = {
    create?: XOR<MemberTransactionCreateWithoutLoanInput, MemberTransactionUncheckedCreateWithoutLoanInput> | MemberTransactionCreateWithoutLoanInput[] | MemberTransactionUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: MemberTransactionCreateOrConnectWithoutLoanInput | MemberTransactionCreateOrConnectWithoutLoanInput[]
    upsert?: MemberTransactionUpsertWithWhereUniqueWithoutLoanInput | MemberTransactionUpsertWithWhereUniqueWithoutLoanInput[]
    createMany?: MemberTransactionCreateManyLoanInputEnvelope
    set?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
    disconnect?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
    delete?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
    connect?: MemberTransactionWhereUniqueInput | MemberTransactionWhereUniqueInput[]
    update?: MemberTransactionUpdateWithWhereUniqueWithoutLoanInput | MemberTransactionUpdateWithWhereUniqueWithoutLoanInput[]
    updateMany?: MemberTransactionUpdateManyWithWhereWithoutLoanInput | MemberTransactionUpdateManyWithWhereWithoutLoanInput[]
    deleteMany?: MemberTransactionScalarWhereInput | MemberTransactionScalarWhereInput[]
  }

  export type MemberCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<MemberCreateWithoutTransactionsInput, MemberUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutTransactionsInput
    connect?: MemberWhereUniqueInput
  }

  export type MemberLoanCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<MemberLoanCreateWithoutTransactionsInput, MemberLoanUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: MemberLoanCreateOrConnectWithoutTransactionsInput
    connect?: MemberLoanWhereUniqueInput
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type MemberUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<MemberCreateWithoutTransactionsInput, MemberUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutTransactionsInput
    upsert?: MemberUpsertWithoutTransactionsInput
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutTransactionsInput, MemberUpdateWithoutTransactionsInput>, MemberUncheckedUpdateWithoutTransactionsInput>
  }

  export type MemberLoanUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<MemberLoanCreateWithoutTransactionsInput, MemberLoanUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: MemberLoanCreateOrConnectWithoutTransactionsInput
    upsert?: MemberLoanUpsertWithoutTransactionsInput
    disconnect?: MemberLoanWhereInput | boolean
    delete?: MemberLoanWhereInput | boolean
    connect?: MemberLoanWhereUniqueInput
    update?: XOR<XOR<MemberLoanUpdateToOneWithWhereWithoutTransactionsInput, MemberLoanUpdateWithoutTransactionsInput>, MemberLoanUncheckedUpdateWithoutTransactionsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumLoanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusFilter<$PrismaModel> | $Enums.LoanStatus
  }

  export type NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel> | $Enums.LoanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanStatusFilter<$PrismaModel>
    _max?: NestedEnumLoanStatusFilter<$PrismaModel>
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type MemberLoanCreateWithoutMemberInput = {
    id?: string
    amount: number
    interestRate?: number
    status?: $Enums.LoanStatus
    issuedAt?: Date | string
    transactions?: MemberTransactionCreateNestedManyWithoutLoanInput
  }

  export type MemberLoanUncheckedCreateWithoutMemberInput = {
    id?: string
    amount: number
    interestRate?: number
    status?: $Enums.LoanStatus
    issuedAt?: Date | string
    transactions?: MemberTransactionUncheckedCreateNestedManyWithoutLoanInput
  }

  export type MemberLoanCreateOrConnectWithoutMemberInput = {
    where: MemberLoanWhereUniqueInput
    create: XOR<MemberLoanCreateWithoutMemberInput, MemberLoanUncheckedCreateWithoutMemberInput>
  }

  export type MemberLoanCreateManyMemberInputEnvelope = {
    data: MemberLoanCreateManyMemberInput | MemberLoanCreateManyMemberInput[]
    skipDuplicates?: boolean
  }

  export type MemberTransactionCreateWithoutMemberInput = {
    id?: string
    amount: number
    type: $Enums.TransactionType
    date?: Date | string
    description?: string | null
    loan?: MemberLoanCreateNestedOneWithoutTransactionsInput
  }

  export type MemberTransactionUncheckedCreateWithoutMemberInput = {
    id?: string
    loanId?: string | null
    amount: number
    type: $Enums.TransactionType
    date?: Date | string
    description?: string | null
  }

  export type MemberTransactionCreateOrConnectWithoutMemberInput = {
    where: MemberTransactionWhereUniqueInput
    create: XOR<MemberTransactionCreateWithoutMemberInput, MemberTransactionUncheckedCreateWithoutMemberInput>
  }

  export type MemberTransactionCreateManyMemberInputEnvelope = {
    data: MemberTransactionCreateManyMemberInput | MemberTransactionCreateManyMemberInput[]
    skipDuplicates?: boolean
  }

  export type MemberLoanUpsertWithWhereUniqueWithoutMemberInput = {
    where: MemberLoanWhereUniqueInput
    update: XOR<MemberLoanUpdateWithoutMemberInput, MemberLoanUncheckedUpdateWithoutMemberInput>
    create: XOR<MemberLoanCreateWithoutMemberInput, MemberLoanUncheckedCreateWithoutMemberInput>
  }

  export type MemberLoanUpdateWithWhereUniqueWithoutMemberInput = {
    where: MemberLoanWhereUniqueInput
    data: XOR<MemberLoanUpdateWithoutMemberInput, MemberLoanUncheckedUpdateWithoutMemberInput>
  }

  export type MemberLoanUpdateManyWithWhereWithoutMemberInput = {
    where: MemberLoanScalarWhereInput
    data: XOR<MemberLoanUpdateManyMutationInput, MemberLoanUncheckedUpdateManyWithoutMemberInput>
  }

  export type MemberLoanScalarWhereInput = {
    AND?: MemberLoanScalarWhereInput | MemberLoanScalarWhereInput[]
    OR?: MemberLoanScalarWhereInput[]
    NOT?: MemberLoanScalarWhereInput | MemberLoanScalarWhereInput[]
    id?: StringFilter<"MemberLoan"> | string
    memberId?: StringFilter<"MemberLoan"> | string
    amount?: FloatFilter<"MemberLoan"> | number
    interestRate?: FloatFilter<"MemberLoan"> | number
    status?: EnumLoanStatusFilter<"MemberLoan"> | $Enums.LoanStatus
    issuedAt?: DateTimeFilter<"MemberLoan"> | Date | string
  }

  export type MemberTransactionUpsertWithWhereUniqueWithoutMemberInput = {
    where: MemberTransactionWhereUniqueInput
    update: XOR<MemberTransactionUpdateWithoutMemberInput, MemberTransactionUncheckedUpdateWithoutMemberInput>
    create: XOR<MemberTransactionCreateWithoutMemberInput, MemberTransactionUncheckedCreateWithoutMemberInput>
  }

  export type MemberTransactionUpdateWithWhereUniqueWithoutMemberInput = {
    where: MemberTransactionWhereUniqueInput
    data: XOR<MemberTransactionUpdateWithoutMemberInput, MemberTransactionUncheckedUpdateWithoutMemberInput>
  }

  export type MemberTransactionUpdateManyWithWhereWithoutMemberInput = {
    where: MemberTransactionScalarWhereInput
    data: XOR<MemberTransactionUpdateManyMutationInput, MemberTransactionUncheckedUpdateManyWithoutMemberInput>
  }

  export type MemberTransactionScalarWhereInput = {
    AND?: MemberTransactionScalarWhereInput | MemberTransactionScalarWhereInput[]
    OR?: MemberTransactionScalarWhereInput[]
    NOT?: MemberTransactionScalarWhereInput | MemberTransactionScalarWhereInput[]
    id?: StringFilter<"MemberTransaction"> | string
    memberId?: StringFilter<"MemberTransaction"> | string
    loanId?: StringNullableFilter<"MemberTransaction"> | string | null
    amount?: FloatFilter<"MemberTransaction"> | number
    type?: EnumTransactionTypeFilter<"MemberTransaction"> | $Enums.TransactionType
    date?: DateTimeFilter<"MemberTransaction"> | Date | string
    description?: StringNullableFilter<"MemberTransaction"> | string | null
  }

  export type MemberCreateWithoutLoansInput = {
    memberId: string
    name: string
    phone?: string | null
    email?: string | null
    clerkId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: MemberTransactionCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutLoansInput = {
    id?: number
    memberId: string
    name: string
    phone?: string | null
    email?: string | null
    clerkId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: MemberTransactionUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutLoansInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutLoansInput, MemberUncheckedCreateWithoutLoansInput>
  }

  export type MemberTransactionCreateWithoutLoanInput = {
    id?: string
    amount: number
    type: $Enums.TransactionType
    date?: Date | string
    description?: string | null
    member: MemberCreateNestedOneWithoutTransactionsInput
  }

  export type MemberTransactionUncheckedCreateWithoutLoanInput = {
    id?: string
    memberId: string
    amount: number
    type: $Enums.TransactionType
    date?: Date | string
    description?: string | null
  }

  export type MemberTransactionCreateOrConnectWithoutLoanInput = {
    where: MemberTransactionWhereUniqueInput
    create: XOR<MemberTransactionCreateWithoutLoanInput, MemberTransactionUncheckedCreateWithoutLoanInput>
  }

  export type MemberTransactionCreateManyLoanInputEnvelope = {
    data: MemberTransactionCreateManyLoanInput | MemberTransactionCreateManyLoanInput[]
    skipDuplicates?: boolean
  }

  export type MemberUpsertWithoutLoansInput = {
    update: XOR<MemberUpdateWithoutLoansInput, MemberUncheckedUpdateWithoutLoansInput>
    create: XOR<MemberCreateWithoutLoansInput, MemberUncheckedCreateWithoutLoansInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutLoansInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutLoansInput, MemberUncheckedUpdateWithoutLoansInput>
  }

  export type MemberUpdateWithoutLoansInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: MemberTransactionUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutLoansInput = {
    id?: IntFieldUpdateOperationsInput | number
    memberId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: MemberTransactionUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type MemberTransactionUpsertWithWhereUniqueWithoutLoanInput = {
    where: MemberTransactionWhereUniqueInput
    update: XOR<MemberTransactionUpdateWithoutLoanInput, MemberTransactionUncheckedUpdateWithoutLoanInput>
    create: XOR<MemberTransactionCreateWithoutLoanInput, MemberTransactionUncheckedCreateWithoutLoanInput>
  }

  export type MemberTransactionUpdateWithWhereUniqueWithoutLoanInput = {
    where: MemberTransactionWhereUniqueInput
    data: XOR<MemberTransactionUpdateWithoutLoanInput, MemberTransactionUncheckedUpdateWithoutLoanInput>
  }

  export type MemberTransactionUpdateManyWithWhereWithoutLoanInput = {
    where: MemberTransactionScalarWhereInput
    data: XOR<MemberTransactionUpdateManyMutationInput, MemberTransactionUncheckedUpdateManyWithoutLoanInput>
  }

  export type MemberCreateWithoutTransactionsInput = {
    memberId: string
    name: string
    phone?: string | null
    email?: string | null
    clerkId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: MemberLoanCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutTransactionsInput = {
    id?: number
    memberId: string
    name: string
    phone?: string | null
    email?: string | null
    clerkId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: MemberLoanUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutTransactionsInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutTransactionsInput, MemberUncheckedCreateWithoutTransactionsInput>
  }

  export type MemberLoanCreateWithoutTransactionsInput = {
    id?: string
    amount: number
    interestRate?: number
    status?: $Enums.LoanStatus
    issuedAt?: Date | string
    member: MemberCreateNestedOneWithoutLoansInput
  }

  export type MemberLoanUncheckedCreateWithoutTransactionsInput = {
    id?: string
    memberId: string
    amount: number
    interestRate?: number
    status?: $Enums.LoanStatus
    issuedAt?: Date | string
  }

  export type MemberLoanCreateOrConnectWithoutTransactionsInput = {
    where: MemberLoanWhereUniqueInput
    create: XOR<MemberLoanCreateWithoutTransactionsInput, MemberLoanUncheckedCreateWithoutTransactionsInput>
  }

  export type MemberUpsertWithoutTransactionsInput = {
    update: XOR<MemberUpdateWithoutTransactionsInput, MemberUncheckedUpdateWithoutTransactionsInput>
    create: XOR<MemberCreateWithoutTransactionsInput, MemberUncheckedCreateWithoutTransactionsInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutTransactionsInput, MemberUncheckedUpdateWithoutTransactionsInput>
  }

  export type MemberUpdateWithoutTransactionsInput = {
    memberId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: MemberLoanUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    memberId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    clerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: MemberLoanUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type MemberLoanUpsertWithoutTransactionsInput = {
    update: XOR<MemberLoanUpdateWithoutTransactionsInput, MemberLoanUncheckedUpdateWithoutTransactionsInput>
    create: XOR<MemberLoanCreateWithoutTransactionsInput, MemberLoanUncheckedCreateWithoutTransactionsInput>
    where?: MemberLoanWhereInput
  }

  export type MemberLoanUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: MemberLoanWhereInput
    data: XOR<MemberLoanUpdateWithoutTransactionsInput, MemberLoanUncheckedUpdateWithoutTransactionsInput>
  }

  export type MemberLoanUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    interestRate?: FloatFieldUpdateOperationsInput | number
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutLoansNestedInput
  }

  export type MemberLoanUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    interestRate?: FloatFieldUpdateOperationsInput | number
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberLoanCreateManyMemberInput = {
    id?: string
    amount: number
    interestRate?: number
    status?: $Enums.LoanStatus
    issuedAt?: Date | string
  }

  export type MemberTransactionCreateManyMemberInput = {
    id?: string
    loanId?: string | null
    amount: number
    type: $Enums.TransactionType
    date?: Date | string
    description?: string | null
  }

  export type MemberLoanUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    interestRate?: FloatFieldUpdateOperationsInput | number
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: MemberTransactionUpdateManyWithoutLoanNestedInput
  }

  export type MemberLoanUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    interestRate?: FloatFieldUpdateOperationsInput | number
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: MemberTransactionUncheckedUpdateManyWithoutLoanNestedInput
  }

  export type MemberLoanUncheckedUpdateManyWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    interestRate?: FloatFieldUpdateOperationsInput | number
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberTransactionUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    loan?: MemberLoanUpdateOneWithoutTransactionsNestedInput
  }

  export type MemberTransactionUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MemberTransactionUncheckedUpdateManyWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MemberTransactionCreateManyLoanInput = {
    id?: string
    memberId: string
    amount: number
    type: $Enums.TransactionType
    date?: Date | string
    description?: string | null
  }

  export type MemberTransactionUpdateWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    member?: MemberUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type MemberTransactionUncheckedUpdateWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MemberTransactionUncheckedUpdateManyWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}