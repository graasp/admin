defmodule AdminWeb.BlogXML do
  use AdminWeb, :xml

  embed_templates "blog_xml/*"
end
