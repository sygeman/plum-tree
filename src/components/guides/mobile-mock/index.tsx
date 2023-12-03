import phone from "./phone-mock.svg";

export default (props) => {
  return (
    <div className="relative h-[296px] overflow-hidden m-auto w-[200px] mb-[15px]">
      <img src={phone} width="200" />
      <img
        src={props.display}
        className="w-[170px] absolute left-[15px] top-[60px]"
      />
    </div>
  );
};
