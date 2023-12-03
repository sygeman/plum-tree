export default ({ message }: { message: string }) => (
  <div className="text-center">
    <p>{message}</p>
    <i className="icon-loading icon-spin" />
  </div>
);
