defmodule AdminWeb.BlogXML do
  @moduledoc """
  This module defines views in XML related to the blog functionality.
  """
  use AdminWeb, :xml

  embed_templates "blog_xml/*"
end
