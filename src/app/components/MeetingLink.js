const MeetingLink = ({ link }) => (
  <div className="mt-4 bg-gray-100 p-4 rounded border text-center">
    <p className="font-medium mb-2 text-black">Your Meeting Link:</p>
    <a
      href={link?.split(" ")?.at(0)}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline break-all"
    >
      {link?.split(" ")?.at(0)}
    </a>
    <br />
    {link?.split("(")?.at(1)?.trim() || ""}
  </div>
);

export default MeetingLink; 