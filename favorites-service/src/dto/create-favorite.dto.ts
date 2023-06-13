import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FavoriteDTO {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly team: string;

  @IsNotEmpty()
  @IsString()
  readonly score: string;

  @IsNotEmpty()
  @IsString()
  readonly avatar: string;
}
