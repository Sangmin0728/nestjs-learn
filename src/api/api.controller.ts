import { Controller, Get } from '@nestjs/common/decorators';

@Controller({ host: 'api.localhost' })
// @Controller('api')
export class ApiController {
  @Get()
  index(): string {
    return 'Hello API';
  }
}
