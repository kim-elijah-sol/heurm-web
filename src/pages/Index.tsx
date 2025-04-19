import { Button, Input } from '~/shared/ui';

function Index() {
  return (
    <div class='p-4 flex flex-col gap-3'>
      <Button>하이하이</Button>
      <Button size='full'>하이하이</Button>
      <Button variant='warning'>리얼 탈퇴?</Button>
      <Button variant='text'>텍스트 버튼</Button>
      <Button variant='border'>보더 버튼</Button>
      <Button variant='link'>링크 버튼</Button>

      <Input placeholder='id 입력!' />
      <Input type='password' placeholder='비번 입력!' />
      <Input placeholder='에러 발생' error />
    </div>
  );
}

export default Index;
