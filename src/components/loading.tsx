type Props = {
  message?: string;
};

export const Loading = ({ message }: Props) => (
  <div className="text-center">
    <p>{message}</p>
    <i className="icon-loading icon-spin" />
  </div>
);
