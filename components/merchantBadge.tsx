type Merchant = {
  merchant: string;
};

const MerchantBadge = ({ merchant }: Merchant): JSX.Element => {
  let badgeStyling;
  switch (merchant) {
    case 'EBay':
      badgeStyling = 'bg-green-200 text-green-800';
      break;
    case 'Mercari':
      badgeStyling = 'bg-blue-200 text-blue-800';
      break;
    case 'Poshmark':
      badgeStyling = 'bg-red-200 text-red-800';
      break;
    default:
      badgeStyling = 'bg-gray-200 text-gray-800';
      break;
  }

  return (
    <div className={`text-left`}>
      <p
        className={`font-bold min-w-min m-3 p-1 place-content-end text-xs rounded-full ${badgeStyling}`}
      >
        {merchant}
      </p>
    </div>
  );
};

export default MerchantBadge;
